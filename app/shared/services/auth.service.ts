import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  private _isLoggedIn: boolean = false;
  private _redirectUrl: string;
  private _userName: string;

  public get userName() { return this._userName; }
  public get isLoggedIn() { return this._isLoggedIn; }
  public get redirectUrl() { return this._redirectUrl; }
  public set redirectUrl(value: string) { this._redirectUrl = value; }

  public login() {
    return Observable.of(true).delay(1000).do(val => {
      this._isLoggedIn = true;
      this._userName = 'aran';
    });
  }

  public logout() {
    this._isLoggedIn = false;
  }
}
