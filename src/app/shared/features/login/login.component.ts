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
import { catchError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('dynamicForm') dynamicForm: NgForm;
  loginForm: any = FormGroup;
  submitted = false;
  errorMessage: any;
  mainForm: any = {};
  messageContent = new MessageContent();
  userData :any;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.autoLogin()
  }

  autoLogin() {
    if(localStorage.getItem('access-token') && localStorage.getItem('refresh-token')) {
      let body = {refreshToken: localStorage.getItem('refresh-token')}
      this.authService.refreshToken(body).subscribe(res => {
        if(res){
          localStorage.setItem('access-token', res.accessToken);
          localStorage.setItem('refresh-token', res.refreshToken);
          this.reloadCurrentRoute();
        }
      }), catchError((err): any => {
        console.log(err);
      })
    }
  }

  reloadCurrentRoute() {
    this.router.navigate(['home']);

  }

  get f() {
    return this.loginForm.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let param = {}
    param['email'] = this.loginForm.value.email
    param['password'] = btoa(this.loginForm.value.password)

    this.authService.login(param)
      .subscribe(
        res => {
          if (res.success == true) {
            this.userData = res.user_role;
            var localStorageObject ={"userid":res.id, "name":res.name, "access-token":res.accessToken,"email":res.email,"refresh-token":res.refreshToken,"user_role":res.roles,"profile_image":res.profile_image};
            localStorage.setItem('authObject', JSON.stringify(localStorageObject));
            localStorage.setItem("userid",res.id)
            localStorage.setItem("name",res.name)
            localStorage.setItem("email",res.email)
            localStorage.setItem("role",res.roles)
            localStorage.setItem("access-token",res.accessToken);
            localStorage.setItem("refresh-token",res.refreshToken);

            this.formService.showSuccess(this.messageContent.LoginMessage, this.messageContent.sucessMessageTitle)
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.formService.showError(error.error.message, this.messageContent.errorMessageTitle)
        });

  }

}
