import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Crisis, CrisisService } from './crisis.service';

const ID_CONST = 'id';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
})



export class CrisisListComponent implements OnInit, OnDestroy {
  public crises: Crisis[];
  public selectedId: number;
  public sub: any;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router) { }

  public ngOnInit() {
    this.sub = this.route
      .params
      .subscribe(params => {
        this.selectedId = +params[ID_CONST];
        this.service.getCrises()
          .then(crises => this.crises = crises);
      });
  }

  public ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

  private onSelect(crisis: Crisis) {
    // Navigate with Absolute link
    this.router.navigate(['/crisis-center', crisis.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
