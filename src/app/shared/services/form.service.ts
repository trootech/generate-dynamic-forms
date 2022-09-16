import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from './api.service';
import { RequestParameter } from '../model/request-parameter';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  BASE_URL = 'http://localhost:5000/'

  constructor (
    private toastr: ToastrService,
    private apiService: ApiService,
    private http: HttpClient
  ){ }

  getFormDataList(){
    return this.apiService.get(this.BASE_URL+'forms/all');
  }

  getFormData(id:any){
    return this.apiService.get(this.BASE_URL+'forms/by/?id='+ id );
  }

  submitFormFieldsValue(newBody:any){
    const headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('access-token')
    });
    return this.http.post(this.BASE_URL+'forms/savedetailsnew', newBody, { headers: headers });
  }

  deleteForm(id:any){
    return this.apiService.delete(this.BASE_URL+'forms/deleteForm/?id='+ id );
  }

  getFormFieldsEntries(id:any){

    return this.apiService.get(this.BASE_URL+'forms/GetAllFormEntries?form_id='+id);
  }

  FormFieldsEntrieDelete(entry_id:any){

    return this.apiService.delete(this.BASE_URL+'forms/DeleteEntries?entry_id='+entry_id);
  }

  getFromAndEnteriesById(form_id:any,entry_id:any){

    return this.apiService.get(this.BASE_URL+'forms/GetEntriesById?form_id='+form_id+'&entry_id='+entry_id);

  }

  getListEnteriesById(form_id:any){

    return this.apiService.get(this.BASE_URL+'forms/GetAllFormEntriesNew?form_id='+form_id);

  }

  updateFormFieldsValue(newBody:any): Observable<any>{
   let params: RequestParameter[] = [];
   for (const key in newBody) {
      params.push(new RequestParameter(key, newBody[key]));
   }
    return this.apiService.post(this.BASE_URL+'forms/update', params );
  }

  updateFormEntry(newBody:any){
    const headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('access-token')
    });

    return this.http.put(this.BASE_URL+'forms/UpdateEntries',newBody, { headers: headers });

  }

  formGenerator(formBody:any):Observable<any>{
    let params: RequestParameter[] = [];
    for (const key in formBody) {
        params.push(new RequestParameter(key, formBody[key]));
    }
    return this.apiService.post(this.BASE_URL+'forms/create',params);

  }

  logout(){
    return this.http.post(this.BASE_URL+'auth/logout', {})
  }

  showSuccess(message, title){
    this.toastr.success(message, title)
  }

  showError(message, title){
      this.toastr.error(message,title)
  }

  showInfo(message, title){
      this.toastr.info(message, title)
  }

  showWarning(message, title){
      this.toastr.warning(message, title)
  }

}


