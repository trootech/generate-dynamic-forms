import { Component, Input, OnInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';

@Component({
  selector: 'app-new-sub-form-create',
  templateUrl: './new-sub-form-create.component.html',
  styleUrls: ['./new-sub-form-create.component.scss']
})
export class NewSubFormCreateComponent implements OnInit {

  @Input() fieldCounter = 0;
  @Output() addNewField = new EventEmitter();
  @Output() save = new EventEmitter();

  @Input() updateField: any = null;
  fieldId = 0
  // showField:any=true;
  showField: boolean = true;

  validationForm:any = FormGroup;
  submitted = false;
  selectedValidation:any = [];
  dataSet:any = {};
  fieldSet:any ={};
  fiieldsValues:any
  openStatus:any = false;
  message:any = false;
  messageContent = new MessageContent();
  element:any
  constructor(
    private formBuilder:FormBuilder,
    private formService: FormService,
   
  ) { }

  validationList = [
    {
      id: 1,
      label: 'Required',
      name: 'required',
      value: false,
      isChecked: false
    },
    {
      id: 2,
      label: 'Max Length',
      name: 'maxLength',
      value: 0,
      isChecked: false,
      option: {
        field: 'input',
        type: 'text',
        name: 'maxLengthValue',
      }
    },
    {
      id: 3,
      label: 'Min Length',
      name: 'minLength',
      value: 0,
      isChecked: false,
      option: {
        field: 'input',
        type: 'text',
        name: 'minLengthValue',
      }
    },
  ]

  get f() { return this.validationForm.controls; }

  ngOnInit(): void {
    this.validationForm = this.formBuilder.group({
      field_name: ['', Validators.required],
      field_label: ['', Validators.required],
      field_type: ['text', Validators.required],
      required:'',
      maxLengthValue: [0, [Validators.required, Validators.maxLength(3)]],
      minLengthValue: [0, [Validators.required, Validators.maxLength(3)]],
      maxLength:[false],
      minLength:[false],
      is_visible_in_entery:[]
    });
    if(this.updateField) {
      this.setUpdateValue()
    }

  }

  setUpdateValue() {

    this.validationForm.controls['field_name'].disable();
    
    this.fieldId = this.updateField._id;

    this.validationForm.controls['field_name'].setValue(this.updateField.field_name);
    this.validationForm.controls['field_label'].setValue(this.updateField.field_label);
    setTimeout(() => {
  
      this.showField = this.updateField.is_visible_in_entery
      // this.validationForm.controls['is_visible_in_entery'].setValue(this.updateField.is_visible_in_entery);
      this.validationForm.controls['field_type'].setValue(this.updateField.field_type);

      let validationObj = this.updateField.validation;
  
      if(validationObj && validationObj.required) {
        this.validationForm.controls['required'].setValue(validationObj.required)
      }
      if(validationObj && validationObj.maxLength > 0) {
        this.validationForm.controls['maxLength'].setValue(true)
        this.validationForm.controls['maxLengthValue'].setValue(validationObj.maxLength);
      }
      if(validationObj && validationObj.minLength > 0) {
        this.validationForm.controls['minLength'].setValue(true)
        this.validationForm.controls['minLengthValue'].setValue(validationObj.minLength);
      }

    }, 200);

  }

  onSubmit(){
    this.submitted = true;

    if (this.validationForm.invalid) {
        return;
    }

    this.fieldSet = {}
    if(this.updateField) {
      this.fieldSet._id = this.fieldId;
    } else {
      this.fieldSet.fieldId = this.fieldCounter;
    }


    this.fieldSet.field_name = this.validationForm.controls['field_name'].value
    this.fieldSet.field_label = this.validationForm.controls['field_label'].value
    this.fieldSet.field_type = this.validationForm.controls['field_type'].value
    this.fieldSet.is_visible_in_entery = this.showField//this.validationForm.controls['is_visible_in_entery'].value
    let validation = []
    if(this.validationForm.controls['required'].value){

        this.dataSet['required'] = this.validationForm.controls['required'].value
        
      }

    if(this.validationForm.controls['maxLength'].value) {
      this.dataSet['maxLength'] = this.validationForm.controls['maxLengthValue'].value 
    }
    if(this.validationForm.controls['minLength'].value) {
      this.dataSet['minLength']= this.validationForm.controls['minLengthValue'].value
     
    }
    this.fieldSet.validation = this.dataSet;
 
    if(this.validationForm.controls['field_type'].value === 'radio' 
    || this.validationForm.controls['field_type'].value === 'select' 
    || this.validationForm.controls['field_type'].value === 'multi-select' 
    ||  this.validationForm.controls['field_type'].value === 'checkbox' ){
      if(this.fiieldsValues){
        this.message = false
        this.fieldSet['field_values'] = this.fiieldsValues;
        this.addNewField.emit(this.fieldSet);
    
        this.formService.showSuccess(this.messageContent.sucessMessage,this.messageContent.sucessMessageTitle)
        this.save.emit('save');
      } else {
        this.message = true;

      }
    } 
    else{
      console.log(this.fieldSet)
       this.message = false;
       this.fieldSet['field_values'] = this.fiieldsValues;
       this.addNewField.emit(this.fieldSet);
   
       this.formService.showSuccess(this.messageContent.sucessMessage,this.messageContent.sucessMessageTitle)
       this.save.emit('save');
    }

  }

  fetchSelectedItems() {
    this.selectedValidation = this.validationList.filter((value, index) => {
      return value.isChecked
    });
  }

  getFieldData(values:any){
    this.fiieldsValues = values
  }

 
  openSelect(){
    this.openStatus = !this.openStatus;
    this.element = document.getElementById('names');
    if(this.openStatus){
    this.element.size = this.element.length;  
     } 
     else {
     this.element.size = 1;   
      }
    }


  handleChange(){
    this.openSelect();
  }

  showEnteryOrNot(event:any){
    this.showField =event.target.checked; 

  }

}
