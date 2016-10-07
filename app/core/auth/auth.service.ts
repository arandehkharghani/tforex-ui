import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { User, appSettings, AppSettings } from '../../core';

@Injectable()
export class AuthService {
  public defaultHeaders: Headers = new Headers();
  protected basePath = 'http://localhost:10020/';
  private _redirectUrl: string;
  private _userId: string | number;

  public set userId(value: string | number) {
    this._userId = value;
    sessionStorage.setItem('user_id', value.toString());
  }
  public get userId() {
    this._userId = sessionStorage.getItem('user_id');
    return this._userId;
  }

  public get isLoggedIn() { return this.userId; }

  public get redirectUrl() {
    this._redirectUrl = sessionStorage.getItem('redirect_url');
    return this._redirectUrl;
  }
  public set redirectUrl(value: string) {
    this._redirectUrl = value;
    sessionStorage.setItem('redirect_url', value);
  }

  constructor(protected http: Http, @Inject(appSettings) private _appSettings: AppSettings, protected router: Router) {
    if (_appSettings.apiGatewayBasePath) {
      this.basePath = _appSettings.apiGatewayBasePath;
    }
  }

  public loginAndRedirect(userId: string | number) {
    if (userId) {
      this.userId = userId;

      let redirect = this.redirectUrl;
      if (!redirect) {
        redirect = '/strategies';
      }

      let navigationExtras: NavigationExtras = {
        preserveQueryParams: true, // if you want to keep user_id in the params then you can set it to true
        preserveFragment: false,
      };
      this.router.navigate([redirect], navigationExtras);
    }
  }

  public logout() {
    this.userId = null;
  }

  public getUser(extraHttpRequestParams?: any): Observable<User> {
    const path = this.basePath + '/user';
    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters,
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }
}