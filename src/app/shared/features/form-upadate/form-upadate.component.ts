import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormValidationService } from '../../services/form-validation.service';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';

@Component({
  selector: 'app-form-upadate',
  templateUrl: './form-upadate.component.html',
  styleUrls: ['./form-upadate.component.scss']
})
export class FormUpadateComponent implements OnInit {

  public form: FormGroup;
  id!: any;
  UpdateFormDataById: any;
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsSS: IDropdownSettings = {};
  isUpdateTitle = false;
  isUpdateButton = false;
  closeResult: string = '';
  form_name:any;
  submitButtonName = new FormControl();
  formFields:any;
  currentField:any;
  formTitle = new FormControl();
  messageContent = new MessageContent();
  
  constructor(
    private modalService: NgbModal,
    private formService: FormService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private formValidationService: FormValidationService
  ) {
    this.id = this.actRoute.snapshot.params['_id'];
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
      // allowSearchFilter: true
    };

    this.dropdownSettingsSS = {
      idField: 'value_name',
      textField: 'value_text',
      singleSelection: true
    };

    this.formService.getFormData(this.id).subscribe((res: any) => {
      this.UpdateFormDataById = res.data;

      this.UpdateFormDataById.fields_id.forEach( (element, index) => {
        const propKey = ['createdAt', 'updatedAt', '__v', 'iseditable', 'isvisibletolist'];
        const removeProperty = (propKey, { [propKey]: propValue, ...rest }) => rest;

        const removeProperties = (object, ...keys) => (keys.length ? removeProperties(removeProperty(keys.pop(), object), ...keys) : object);
        this.UpdateFormDataById.fields_id[index] = removeProperties(element, ...propKey);

      })
      this.createFormController();
      this.form.addControl('formTitle', this.formTitle);
      this.form.addControl('submitButtonName', this.submitButtonName);
    },
      err => {
        this.UpdateFormDataById = err;
      })
  }

  createFormController() {
    this.UpdateFormDataById.fields_id.forEach((field, index) => {
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
      fieldBase.is_visible_in_entery = field.is_visible_in_entery || true;
      let validationObj = field.validation ;
      // if(validationObj && validationObj.length > 0) {
      //   let mapping = validationObj.map(a => [a.validation_type, a.validation_value]);
      //   validationObj = mapping ? Object.fromEntries(mapping) : {};
      // }

      fieldBase.validation = validationObj || {};
      this.UpdateFormDataById.fields_id[index] = fieldBase;
    });

    this.form = this.formValidationService.toFormGroup(this.UpdateFormDataById.fields_id);


  }

  updatedFiledValue(fieldValue:any) {

    let index = this.UpdateFormDataById.fields_id.findIndex(x => x._id === fieldValue._id)
    this.UpdateFormDataById.fields_id[index] = fieldValue
  }
  addNewFiledValue(fieldValue:any) {

    // let index = this.UpdateFormDataById.fields_id.findIndex(x => x._id === fieldValue._id)
    this.UpdateFormDataById.fields_id.push(fieldValue);
    this.createFormController();
  }

  open(content:any,fields:any ) {


    this.currentField = fields;
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }

   openAddField(content:any ) {


    // this.currentField = fields;
     this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
       this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     });
   }


   private getDismissReason(reason: any): string {
     if (reason === ModalDismissReasons.ESC) {
       return 'by pressing ESC';
     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
       return 'by clicking on a backdrop';
     } else {
       return  `with: ${reason}`;
     }
   }

   addField(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }

  updateField(fieldValue, type) {
    this.formFields = fieldValue;

    this.form.controls['formTitle'].setValue(this.UpdateFormDataById.form_name);
    this.form.controls['submitButtonName'].setValue(this.UpdateFormDataById.submitButtonName);

    if(type == 'button') {
      this.isUpdateButton = true
    }
    if(type == 'title'){
      this.isUpdateTitle= true
    }
  }

  saveField(fieldValue, type) {

    this.UpdateFormDataById.form_name =  this.form.controls['formTitle'].value;
    this.UpdateFormDataById.submitButtonName = this.form.controls['submitButtonName'].value;

    if(type == 'button') {
      this.isUpdateButton = false
    }
    if(type == 'title'){
      this.isUpdateTitle= false
    }
  }

  onSubmit() {
    const newBody =
    { _id: this.UpdateFormDataById._id,
      form_name: this.UpdateFormDataById.form_name,
      form_key: this.UpdateFormDataById.form_key,
      submitButtonName: this.UpdateFormDataById.submitButtonName,
      fields: this.UpdateFormDataById.fields_id,
    }
    this.formService.updateFormFieldsValue(newBody).subscribe((res: any) => {
      this.formService.showSuccess("Data shown successfully !!", "Field save")
      this.route.navigate(['/home']);
    },
    err => {
      const error = err ;
    })
  }
}
