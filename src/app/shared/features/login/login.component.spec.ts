import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { FormService } from '../../services/form.service';
 import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule,
                  HttpClientModule,
                 ToastrModule.forRoot(),
                 RouterTestingModule
              ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' email and password is required',()=>{
    let email = component.loginForm.controls['email'];
    let password = component.loginForm.controls['password'];
    expect(email.errors['required']).toBeTruthy();
    expect(password.errors['required']).toBeTruthy();
    email.setValue('');
    password.setValue('');
  })

  it('User Not Found',()=>{
    let email = component.loginForm.controls['email'] ;
    email.setValue('renuk@gmal.com');
    expect(email.errors).toBeNull()
    
  })

  it('pssword is valid',()=>{
    let password = component.loginForm.controls['password'];
    password.setValue('12345678');
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
    
  })

  it('User Login Successfully', () =>{
    let password = component.loginForm.controls['password'];
    let email = component.loginForm.controls['email'];
    email.setValue('renuka@gmal.com');
    password.setValue('12345678');
    expect(email.errors).toBeNull();
    expect(email.valid).toBeTruthy();
    expect(password.errors).toBeNull();
    expect(password.valid).toBeTruthy();
  })

});
