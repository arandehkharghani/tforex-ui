import { Component, OnInit, OnDestroy }          from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';

@Component({
  selector: 'tfrx-app',
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a routerLink="/strategies" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }"  
          class="nav-link active">Strategies</a>
      </li>
      <li class="nav-item">
        <a routerLink="/heroes" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }" class="nav-link">Heroes</a>
      </li>
      <li class="nav-item">
        <a routerLink="/crises" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }" class="nav-link">Crises</a>
      </li>
      <li class="nav-item">
        <a  routerLink="/login" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }" class="nav-link">Login</a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(private _route: Router) { }
  public ngOnInit() {
    /*
    this._route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let url = (<NavigationStart>event).url;
        if (url !== url.toLowerCase()) {
          this._route.navigateByUrl((<NavigationStart>event).url.toLowerCase());
        }
      }
    });  
  */
  }
}