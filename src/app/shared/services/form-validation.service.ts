import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })
export class FormValidationService {

constructor() { }


toFormGroup(fields: any[] ) {
    let group: any = {};
  
  
    fields.forEach((field: any) => {
  
      if (field.field_type == 'checkbox') {
        let opts = {};
        for (let opt of field.field_values) {
          opts[opt.value_name] = new FormControl('');
        }
        group[field.field_name] = new FormGroup(opts);
      } else {
  
        if(field && field.field_name) {
          group[field.field_name] = new FormControl('');
  
          if(field.validation) {
            if(field.validation.required && field.validation.maxLength && field.validation.minLength) {
              group[field.field_name].setValidators([Validators.required, Validators.maxLength(field.validation.maxLength), Validators.minLength(field.validation.minLength)]);
            } else if(field.validation.required && field.validation.maxLength) {
              group[field.field_name].setValidators([Validators.required, Validators.maxLength(field.validation.maxLength)]);
            } else if(field.validation.required && field.validation.email) {
              group[field.field_name].setValidators([Validators.required, Validators.email]);
            }else if(field.validation.required) {
              group[field.field_name].setValidators([Validators.required]);
            }
  
          }
        }
      }
    });
    return new FormGroup(group);
  }

}
