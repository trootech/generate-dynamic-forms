import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../services/form.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { MessageContent } from '../../model/message-content';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {

  id!: any;
  entryId!: any;
  formDataById: any;
  dropdownList: any = [];
  maindata:any;
  keys:any;
  values:any;
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSS: IDropdownSettings = {};
  filename:any;
  file: File;
  messageContent = new MessageContent();
  isVisibleInEntery = [];
  profileData:any;
  cover_image_url: any;
  cover_image: any;
  filePath: string;
  public form: FormGroup;

  constructor(
    private formService: FormService,
    private formValidationService: FormValidationService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private elementRef: ElementRef,
    public fb: FormBuilder
  ) {

    this.id = this.actRoute.snapshot.params['_id'];
    this.entryId = this.actRoute.snapshot.params['entry_id'];
  }



  isValid(fieldName) {

    return this.form.controls[fieldName].valid;
  }
  isDirty(fieldName) {
    return this.form.controls[fieldName].dirty;
  }
  ngOnInit(): void {

    this.dropdownSettings = {
      idField: 'value_name',
      textField: 'value_text',
      allowSearchFilter: true

    };
    this.dropdownSettingsSS = {
      idField: 'value_name',
      textField: 'value_text',
      singleSelection: true
    };

    this.formService.getFormData(this.id).subscribe((res: any) => {
      this.formDataById = res.data;
      this.formDataById.fields_id.forEach((field, index) => {
        let fieldBase:any = {};
        fieldBase._id = field._id || '';
        fieldBase.field_label = field.field_label || '';
        fieldBase.field_name = field.field_name || '';
        fieldBase.field_type = field.field_type || '';
        fieldBase.required = !!field.required;
        fieldBase.order = field.order === undefined ? 1 : field.order;
        fieldBase.iseditable = field.iseditable || false;
        fieldBase.isvisibletolist = field.isvisibletolist || false;
        fieldBase.field_values = field.field_values || [];

        let validationObj = field.validation ;

        fieldBase.validation = validationObj || {};
        if(!field.is_visible_in_entery){
          this.isVisibleInEntery.push(field.field_name)
        }

        this.formDataById.fields_id[index] = fieldBase;
      });

      this.form = this.formValidationService.toFormGroup(this.formDataById.fields_id);

      if(this.entryId) {

        this.loadData();
      }
    },
    err => {
      this.formDataById = err;
    })
  }

  loadData () {
    this.formService.getFromAndEnteriesById(this.id, this.entryId).subscribe((res: any) => {
      this.profileData = res.data[0];
       for (const key in this.profileData.value) {
         if (Object.prototype.hasOwnProperty.call(this.profileData.value, key)) {
           const element = this.profileData.value[key];

          try {

            const regex = /(?:jpeg|jpg|webp?|gif|png)/i;
            if (regex.test(element)) {
               this.cover_image_url = environment.base_url + element;
            }

            this.form.controls[key].setValue(element);
          } catch (error) {
            // console.log(error)
          }

         }
       }
     },
     err =>{
       console.log(err)
     });

  }
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];


    this.form.patchValue({
      employee_Profile: file
    });

    this.form.get('employee_Profile').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file)
  }


  onChange(event: any, type: any, fieldName?: any) {

    const updatedFields = this.formDataById.fields_id;


    if (type === 'email' || type === 'password' || type === 'text') {
      const indexOfObj: any = this.findIntex(this.formDataById.fields_id, event.target.name)
      if (indexOfObj >= 0) {
        updatedFields[indexOfObj].value = event.target.value
        this.formDataById.fields_id = updatedFields;
      }
    }

    if (type === 'radio') {
      const indexOfObj: any = this.findIntex(this.formDataById.fields_id, fieldName)
      if (indexOfObj >= 0) {

        updatedFields[indexOfObj].value = this.form.controls[fieldName].value;
        this.formDataById.fields_id = updatedFields;
      }
    }

    if (type === 'file') {
      this.filename = event.target.name
      const file = event.target.files && event.target.files[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if(file.type.indexOf('image')> -1){
          this.cover_image = file
          reader.onload = (event) => {
            this.cover_image_url = (<FileReader>event.target).result;
          }
        }
      }

    }

    if (type === 'select') {
      const indexOfObj: any = this.findIntex(this.formDataById.fields_id, event.target.name)

      if (indexOfObj >= 0) {
        updatedFields[indexOfObj].value = event.target.value;
        this.formDataById.fields_id = updatedFields;
      }
    }

    if (type === 'checkbox') {
      const indexOfObj: any = this.findIntex(this.formDataById.fields_id, event.target.name)
      if (indexOfObj >= 0) {
        updatedFields[indexOfObj].value = typeof updatedFields[indexOfObj].value !== 'undefined' ? [...updatedFields[indexOfObj].value, event.target.value] : [event.target.value];
        this.formDataById.fields_id = updatedFields;
      }
    }

    if (type === 'multi-select') {
      const indexOfObj: any = this.findIntex(this.formDataById.fields_id, event.value_name)
      if (indexOfObj >= 0) {
        updatedFields[indexOfObj].value = event.value_text
        this.formDataById.fields_id = updatedFields;
      }
    }

  }

  findIntex(obj: Array<{ field_name: string }>, fieldName: string) {
    let returnIndex = -1
    obj.forEach(({ field_name }, index) => {
      if (field_name === fieldName) {
        returnIndex = index
      }
    })
    return returnIndex
  };


  onSubmit() {
    var retrievedObject = localStorage.getItem('authObject');
    var authObj = JSON.parse(retrievedObject);
    if(authObj.user_role !== 'ROLE_USER'){
        let fieldData : any= {};
        var fd = new FormData();
        if(this.cover_image) {
          const { value } = this.form;
          value.cover_image = this.cover_image

          fd.append('imagename', this.filename);
          fd.append('image', value.cover_image);
        }

        if(this.form.valid) {
        for (const key in this.form.controls) {
          if (Object.prototype.hasOwnProperty.call(this.form.controls, key)) {
            const element = this.form.controls[key];
            fieldData[key] = element.value
          }
        }
        fd.append('is_visible_in_entery', JSON.stringify(this.isVisibleInEntery));
        fd.append('form_id', this.formDataById._id);
        fd.append('value', JSON.stringify(fieldData));

        this.formService.submitFormFieldsValue(fd).subscribe((res: any) => {
          if(res.success == true){
            this.formService.showSuccess("Data shown successfully !!", "Field save")
            this.route.navigate(['/form_entry', this.formDataById._id]);
          }
          else{
            this.formService.showError(this.messageContent.errorMessage, this.messageContent.errorMessageTitle)
          }
        },
        err => {
          console.log(err) ;
        })
      } else {
        this.formService.showError(this.messageContent.errorForRequiredFields, this.messageContent.errorMessageTitle)
      }
    }else{
      this.formService.showError(this.messageContent.permissionErrorRoleType,this.messageContent.errorMessageTitle)
    }
  }

  onUpdate(){

      let fieldData : any= {}
      var fd = new FormData();
      if(this.cover_image) {
        const { value } = this.form;
        value.cover_image = this.cover_image
        fd.append('imagename', this.filename);
        fd.append('image', value.cover_image);
      }

      if(this.form.valid) {
      for (const key in this.form.controls) {
        if (Object.prototype.hasOwnProperty.call(this.form.controls, key)) {
          const element = this.form.controls[key];
          fieldData[key] = element.value
        }
      }


      fd.append('_id', this.profileData._id);
      fd.append('form_id', this.id);
      fd.append('entery_id', this.entryId);
      fd.append('value', JSON.stringify(fieldData));


      this.formService.updateFormEntry(fd).subscribe((res:any) => {

        if(res.success == true){
          this.formService.showSuccess(this.messageContent.sucessMessageForupdate, this.messageContent.sucessMessageTitle)

          this.route.navigate(['/form_entry', this.formDataById._id]);
        }
        else{
          this.formService.showError(this.messageContent.errorMessage, this.messageContent.errorMessageTitle)
        }
      },
      err => {
        console.log(err) ;
      })
    } else {
      this.formService.showError(this.messageContent.errorForRequiredFields, this.messageContent.errorMessageTitle)
    }

  }


}
