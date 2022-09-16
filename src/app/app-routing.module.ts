import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/auth/authentication.guard';
import { FormComponent } from './shared/components/form/form.component';
import { DynamicFormComponent } from './shared/features/dynamic-form/dynamic-form.component';
import { EntriesDetailsComponent } from './shared/features/entries-details/entries-details.component';
import { ForgetPasswordComponent } from './shared/features/forget-password/forget-password.component';
import { FormUpadateComponent } from './shared/features/form-upadate/form-upadate.component';
import { HelpComponent } from './shared/features/help/help.component';
import { LoginComponent } from './shared/features/login/login.component';
import { NewFormCreateComponent } from './shared/features/new-form-create/new-form-create.component';
import { RegisterComponent } from './shared/features/register/register.component';

const routes: Routes = [
  { path :'',redirectTo:"/login",pathMatch:'full'},
  { path :'register',component:RegisterComponent},
  { path :'home',component:FormComponent,canActivate:[AuthenticationGuard]},
  { path :'form/:_id',component:DynamicFormComponent,canActivate:[AuthenticationGuard]},
  { path :'form_entry/:_id',component:EntriesDetailsComponent,canActivate:[AuthenticationGuard]},
  { path :'update_form/:_id/:entry_id',component:DynamicFormComponent,canActivate:[AuthenticationGuard]},
  { path : 'create-new-form',component:NewFormCreateComponent,canActivate:[AuthenticationGuard]},
  { path : 'form-update/:_id',component:FormUpadateComponent,canActivate:[AuthenticationGuard]},
  { path : 'login',component:LoginComponent},
  { path : 'help',component:HelpComponent},
  { path : 'forget-password',component:ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

