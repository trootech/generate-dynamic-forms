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
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { confirmPasswordValidator } from '../../validator/confirm-password.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('dynamicForm') dynamicForm: NgForm;
  RegisterForm: any = FormGroup;
  submitted = false;
  errorMessage: any;
  mainForm: any = {};
  messageContent = new MessageContent();
  file_name:any
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formService: FormService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      Confirm_password: ['', Validators.required],
      roles: ['admin', Validators.required],
    },
    {
      validator: confirmPasswordValidator("password", "Confirm_password")
    }
    );
  }

  get f() {
    return this.RegisterForm.controls;
  }

  onChange(event:any){
    this.file_name =event.target.files[0];
  }

  onSubmit() {

    this.isLoading = true;
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    const  value  = this.RegisterForm.value;
    var fd = new FormData();
    console.log(value)
    fd.append('name', value.name);
    fd.append('email', value.email);
    fd.append('password', btoa(value.password));
    // fd.append('Confirm_password', value.Confirm_password);
    fd.append('profile_image',  this.file_name);
    fd.append('roles', value.roles);
    this.authService.Register(fd)
      .subscribe(
        res => {
          if (res.success == true) {
            this.isLoading = false;

            this.formService.showSuccess(this.messageContent.RegisterMessage, this.messageContent.sucessMessageTitle)
            this.route.navigate(['/login']);
          }
        },
        error => {
          this.isLoading = false;
          this.formService.showError(error.message, this.messageContent.errorMessageTitle)
        });

  }



}
