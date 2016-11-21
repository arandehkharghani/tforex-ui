import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  template: `
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a routerLink="/admin/instruments" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: false }"  
          class="nav-link active">Instruments</a>
      </li>
    </ul>
  `,
})

export class AdminNavComponent { }

