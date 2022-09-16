import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, lastValueFrom, map, Observable, retry, throwError } from 'rxjs';
import { RequestParameter } from '../model/request-parameter';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

public contentType = 'application/json';

constructor(
  private httpClient: HttpClient,
  private authService: AuthService,
  private router: Router,
) { }

private getRequiredHeaders(): HttpHeaders {
  const headers = new HttpHeaders({
    'content-type': 'application/json',
    'x-access-token': localStorage.getItem('access-token')
  });

  return headers;
}

public get(url: string, params?: RequestParameter[]): Observable<any> {

  let searchParams = '';
  if (params && params.length > 0) {
    searchParams = this._stringifyParams(params);
  }

  const gatewayURL = url + searchParams;
  const headers = this.getRequiredHeaders();
  return this.httpClient
    .get(gatewayURL, { headers: headers})
    .pipe(
      map(res => res),
      catchError((error): any => {
        return this._handleServerError(url, error);
      })
    )
}

public post(url: string,  params: RequestParameter[] = []): Observable<any> {

  const gatewayURL = url;
  const headers = this.getRequiredHeaders();
  const requestParameters = this._buildFormDataParams(params)// JSON.stringify(params)
  return this.httpClient
    .post(gatewayURL,  JSON.stringify(requestParameters), { headers: headers, observe: 'response' as 'response' })
    .pipe(
      map(res => {
        return res
      }),
      catchError((error): any => {
        return this._handleServerError(url, error);
      })
    )
}

public put(url: string,  params: RequestParameter[] = []): Observable<any> {

  const gatewayURL = url;
  const headers = this.getRequiredHeaders();
  const requestParameters = this._buildFormDataParams(params)
  return this.httpClient
    .put(gatewayURL, JSON.stringify(requestParameters), { headers: headers, observe: 'response' as 'response', responseType: 'blob' })
    .pipe(
      map(res => {
        return res
      }),
      catchError((error): any => {
        return this._handleServerError(url, error);
      })
    )
}

public delete(url: string, params: RequestParameter[] = []): Observable<any> {

  const gatewayURL = url ;
  const headers = this.getRequiredHeaders();
  const requestParameters = this._buildFormDataParams(params)
  const options = {
    headers: headers,
    body: JSON.stringify(requestParameters),
  };
  return this.httpClient
    .delete(gatewayURL, options)
    .pipe(
      map(res => {
        return res
      }),
      catchError((error): any => {
        return this._handleServerError(url, error);
      })
    )
}

public getFile(url: string, params: RequestParameter[] = []): Promise<any> {
  let searchParams = '';
  if (params && params.length > 0) {
    searchParams = this._stringifyParams(params);
  }
  const gatewayURL = url + searchParams;
  const headers = this.getRequiredHeaders();
  return lastValueFrom(this.httpClient
    .get(gatewayURL, { headers: headers, responseType: 'blob' })
  )

}

public postFile(url: string, params: RequestParameter[] = []): Promise<any> {
  const gatewayURL = url;
  const headers = this.getRequiredHeaders();
  const requestParameters = this._buildFormDataParams(params)
  return lastValueFrom(this.httpClient
    .post(gatewayURL, JSON.stringify(requestParameters), { headers: headers, responseType: 'blob' })
  );
}

private _handleServerError(endPoint: string, error: any): Observable<any> {
  let errorInfos: any = 'Server error';
  if ((error.status === 401 || error.status === 403)) {
    // localStorage.removeItem('access-token');
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
    return (error);
  }
  if (error) {
    errorInfos = error;
    errorInfos['status'] = error.status;
  }
  return throwError(() => new Error(errorInfos));
}

private _stringifyParams(parameters: RequestParameter[]): string {
  if (this.contentType === 'application/json') {
    let jsonParams:any = {};
    parameters.forEach((item, index) => {
      jsonParams[item.name] = item.value;
    });
    return JSON.stringify(jsonParams);
  }
  return '';
}

private _buildFormDataParams(parameters: RequestParameter[]): any {
  let formData:any = {};
  parameters.forEach((item, index) => {
    formData[item.name] = item.value;
  });
  return formData;
}

reloadCurrentRoute() {
  const currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}


}
