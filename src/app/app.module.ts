import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './shared/components/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { TextComponent } from './shared/components/text/text.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { SelectComponent } from './shared/components/select/select.component';
import { RadioButtonComponent } from './shared/components/radio-button/radio-button.component';
import { FileUploadComponent } from './shared/components/file-upload/file-upload.component';
import { MultiSelectComponent } from './shared/components/multi-select/multi-select.component';
import { DynamicFormComponent } from './shared/features/dynamic-form/dynamic-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { DynamicformItemComponent } from './shared/features/dynamicform-item/dynamicform-item.component';
import { EntriesDetailsComponent } from './shared/features/entries-details/entries-details.component';
import { UpdateFormComponent } from './shared/features/update-form/update-form.component';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { NewFormCreateComponent } from './shared/features/new-form-create/new-form-create.component';
import { NewSubFormCreateComponent } from './shared/features/new-sub-form-create/new-sub-form-create.component';
import { ToastrModule } from 'ngx-toastr';
import { MultiValueComponent } from './shared/features/multi-value/multi-value.component';
import { FormUpadateComponent } from './shared/features/form-upadate/form-upadate.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MaterialModule } from './shared/material/material.module';
import { HelpComponent } from './shared/features/help/help.component';
import { RegisterComponent } from './shared/features/register/register.component';
import { LoginComponent } from './shared/features/login/login.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { AuthguardServiceService } from './shared/auth/authguard-service.service';
import {MatMenuModule} from '@angular/material/menu';
import { MatCardModule } from "@angular/material/card"
import { ForgetPasswordComponent } from './shared/features/forget-password/forget-password.component';
import { LoginHeaderComponent } from './shared/components/login-header/login-header.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    TextComponent,
    CheckboxComponent,
    SelectComponent,
    RadioButtonComponent,
    FileUploadComponent,
    MultiSelectComponent,
    DynamicFormComponent,
    DynamicformItemComponent,
    EntriesDetailsComponent,
    UpdateFormComponent,
    NewFormCreateComponent,
    NewSubFormCreateComponent,
    MultiValueComponent,
    FormUpadateComponent,
    HeaderComponent,
    FooterComponent,
    HelpComponent,
    RegisterComponent,
    LoginComponent,
    ForgetPasswordComponent,
    LoginHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxAwesomePopupModule.forRoot(), 
    ConfirmBoxConfigModule.forRoot(),
    ToastrModule.forRoot(),
    MaterialModule,
    DragDropModule,
    MatMenuModule,
    MatCardModule
  ],
  providers: [AuthguardServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
