// Exact copy except import UserService from shared
import { Component }   from '@angular/core';

import { HeroService } from '../hero';
import { AuthService } from '../core';

@Component({
  template: `
    <h2>Heroes of {{_userName}}</h2>
    <router-outlet></router-outlet>
  `,
})
export class HeroComponent {
  private _userName = '';
  constructor(_authService: AuthService) {
    this._userName = _authService.userName;
  }
}

