import { Component }        from '@angular/core';
import { Router,
         NavigationExtras } from '@angular/router';
import { AuthService }      from '../shared';

@Component({
  template: `
    <h2>LOGIN</h2>
    <p>{{_message}}</p>
    <p>
      <button (click)="login()"  *ngIf="!_authService._isLoggedIn">Login</button>
      <button (click)="logout()" *ngIf="_authService._isLoggedIn">Logout</button>
    </p>`,
})
export class LoginComponent {
  private _message: string;

  constructor(public _authService: AuthService, public router: Router) {
    this.setMessage();
  }

  private setMessage() {
    this._message = 'Logged ' + (this._authService.isLoggedIn ? 'in' : 'out');
  }

  private login() {
    this._message = 'Trying to log in ...';

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
  }

  private logout() {
    this._authService.logout();
    this.setMessage();
  }
}