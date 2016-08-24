import { Component, Inject }        from '@angular/core';
import { Router,
  NavigationExtras } from '@angular/router';
import { AuthService }      from '../shared';

import { AppSettings, appSettings }                                from '../shared';

@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{_message}}</p>
    <p>
      <button (click)="login('auth/google')"  *ngIf="!_authService._isLoggedIn">Login (google)</button>
      <button (click)="logout()" *ngIf="_authService._isLoggedIn">Logout</button>
    </p>`,
})
export class LoginComponent {
  private _message: string;

  constructor(public _authService: AuthService, public router: Router, @Inject(appSettings) private _appSettings: AppSettings) {
    this.setMessage();
  }

  private setMessage() {
    this._message = 'Logged ' + (this._authService.isLoggedIn ? 'in' : 'out');
  }

  private login(path: string) {
    this._message = 'Trying to log in ...';

    window.location.href = this._appSettings.apiGatewayBasePath +  path;

/*
    this._authService.login().subscribe(() => {
      this.setMessage();
      if (this._authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/strategies';

        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true,
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }
    });
*/
  }

  private logout() {
    this._authService.logout();
    this.setMessage();
  }
}