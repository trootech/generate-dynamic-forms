import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from '../../services/form.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {

  id!: any;
  entryId!: any;
  formDataUpadteById:any;
  dropdownList: any = [];
  dropdownSettings: IDropdownSettings = {};
  entryDataById:any;
  formDataById:any;
  public form: FormGroup;

  constructor(
    private formService: FormService,
    private actRoute: ActivatedRoute,
    private formValidationService: FormValidationService,
  ) {
    this.id = this.actRoute.snapshot.params['_id'];
    this.entryId = this.actRoute.snapshot.params['entry_id'];
  }

  ngOnInit(): void {

    this.dropdownSettings = {
      idField: 'value_name',
      textField: 'value_text',
      allowSearchFilter: true
     
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
        this.formDataById.fields_id[index] = fieldBase;
      });
  
  
      this.form = this.formValidationService.toFormGroup(this.formDataById.fields_id);
    
    },
      err => {
        this.formDataById = err;
      })
  }

  onChange(event: any, type: any,fieldName?: any) {}

  findIntex(obj: Array<{ field_name: string }>, fieldName: string) {
   
    let returnIndex = -1
    obj.forEach(({ field_name }, index) => {
      if (field_name === fieldName) {
        returnIndex = index
      }
    })
    return returnIndex
  };

  onSubmit() {}    
}
