import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormService } from '../../services/form.service';
import { MessageContent } from '../../model/message-content';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-form-create',
  templateUrl: './new-form-create.component.html',
  styleUrls: ['./new-form-create.component.scss'],
})
export class NewFormCreateComponent implements OnInit {
  @ViewChild('dynamicForm') dynamicForm: NgForm;
  newDynamicForm: any = FormGroup;
  submitted = false;
  count = 0;
  errorMessage: any;
  mainForm: any = {};
  isShowAddFields = false;
  deleteIndex ;
  closeResult: string = '';
  formKey = '';
  messageContent = new MessageContent();
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private modalService: NgbModal,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.newDynamicForm = this.formBuilder.group({
      form_name: ['', Validators.required],

      submitButtonName: ['', Validators.required],
    });

    this.formKey = this.randomString(16);
  }

  get f() {
    return this.newDynamicForm.controls;
  }

  addField() {
    this.isShowAddFields = true;
    this.count += 1;
  }

  getFieldData(data: any) {

    if (data.fieldId === 1) {
      this.mainForm['form_name'] =
        this.newDynamicForm.controls['form_name'].value;
      this.mainForm['submitButtonName'] =
        this.newDynamicForm.controls['submitButtonName'].value;
      this.mainForm['fields'] = [];
      this.mainForm['fields'].push(data);
    } else {
      this.mainForm['fields'].push(data);
    }

    this.isShowAddFields = false;
  }

  removeField(index: any) {
    this.mainForm['fields'].splice(index, 1);
    this.formService.showSuccess(
      this.messageContent.sucessMessageForRemoved,
      this.messageContent.sucessMessageTitle
    );
  }

  onSubmit(formData: any) {
    this.submitted = true;

    if (this.newDynamicForm.invalid) {
      return;
    }
    this.isLoading = true;
    let params: any = {};

    params['form_name'] = this.mainForm['form_name'];
    params['form_key'] = this.formKey;
    params['submitButtonName'] = this.mainForm['submitButtonName'];
    params['fields'] = this.mainForm['fields'];

    this.formService.formGenerator(params).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.formService.showSuccess(
          this.messageContent.sucessMessage,
          this.messageContent.sucessMessageTitle
        );
        this.newDynamicForm.reset();
        this.count = 0
        this.mainForm = [];
        Object.keys(formData.controls).forEach((key) => {
          formData.get(key).setErrors(null);
        });

        this.route.navigate(['/home']);
      },
      (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.error;
      }
    );
  }


  open(content:any ,index:any) {
   this.deleteIndex = index;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
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



  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
