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
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../validator/confirm-password.validator';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  @ViewChild('dynamicForm') dynamicForm: NgForm;
  resetPasswordForm: any = FormGroup;
  submitted = false;
  errorMessage: any;
  mainForm: any = {};
  messageContent = new MessageContent();
  userData :any;
  resetpassword : boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      Confirm_password: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator("password", "Confirm_password")
    }
    );
  }

  get f() {
    return this.resetPasswordForm.controls;
  }


  onSubmit() {
    this.resetpassword = true
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      return;
    }
    let param = {}
    param['email'] = this.resetPasswordForm.value.email
    param['password'] = btoa(this.resetPasswordForm.value.password)


    this.authService.forgetpassword(param)
      .subscribe(
        res => {
          if (res) {
            this.formService.showSuccess(res.message, this.messageContent.sucessMessageTitle)
            this.route.navigateByUrl("/login")
          }
        },
        error => {
          this.formService.showError(error.error.message, this.messageContent.errorMessageTitle)
        });

  }

}
