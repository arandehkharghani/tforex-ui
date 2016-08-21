import { Component }          from '@angular/core';

@Component({
  selector: 'sg-app',
  template: `
    <h1 class="title">UI</h1>
     <nav>
      <a routerLink="/strategies" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Strategies</a>
      <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
      <a routerLink="/crises" routerLinkActive="active">Crisis</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
    </nav>    
    <router-outlet></router-outlet>
  `,
})
export class AppComponent { }