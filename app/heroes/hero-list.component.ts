// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Hero, HeroService } from '../heroes';

const ID_CONST = 'id';

@Component({
  template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `,
})
export class HeroListComponent implements OnInit, OnDestroy {
  public heroes: Hero[];

  public selectedId: number;
  public sub: any;

  constructor(
    private service: HeroService,
    private router: Router) {
     }

  public ngOnInit() {
    this.sub = this.router
      .routerState
      .queryParams
      .subscribe(params => {
        this.selectedId = +params[ID_CONST];
        this.service.getHeroes()
          .then(heroes => this.heroes = heroes);
      });
  }

  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private isSelected(hero: Hero) { return hero.id === this.selectedId; }

  private onSelect(hero: Hero) {
    this.router.navigate(['/hero', hero.id]);
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
