import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';

@Component({
  selector: 'app-multi-value',
  templateUrl: './multi-value.component.html',
  styleUrls: ['./multi-value.component.scss']
})
export class MultiValueComponent implements OnInit {
  @Output() fieldsValue = new EventEmitter();
  @Input() multiValue: any = null;

  multiValurForm:any = FormGroup;
  items: FormArray;
  fieldSet:any ={};
  fields_data:any;
  message:any= false;
  messageContent = new MessageContent();

  fields_values = []
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    ) { }

  ngOnInit(): void {
    if(this.multiValue) {
       this.fields_values = this.multiValue.field_values
       this.fieldsValue.emit(this.fields_values);
    }
  }

 

  addItem(event, value:any){
    if(value === ''){
        this.message = true;
    }
    else{
      this.message = false;
      event.preventDefault();
      this.fieldSet = {}
      this.fieldSet.value_name = value.toLowerCase();
      this.fieldSet.value_text= value;
  
      this.fields_values.push(this.fieldSet)
  
      this.fieldsValue.emit(this.fields_values);
    }
   
  }

  removeIndex(index:any){
    this.fields_values.splice(index, 1);
    this.fieldsValue.emit(this.fields_values);
  }
}
