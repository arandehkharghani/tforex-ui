import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router }       from '@angular/router';
import { Http } from '@angular/http';
import { Subscription }          from 'rxjs/Subscription';

import { Crisis, CrisisService } from '../crisis';

import * as shared from '../shared';

<<<<<<< HEAD
=======
import * as core from '../core';

>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
const idConst = 'id';

@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of _crises"
        [class.selected]="isSelected(crisis)"
        (click)="onSelect(crisis)">
        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
      </li>
    </ul>
  `,
})
export class CrisisListComponent implements OnInit, OnDestroy {
  private _crises: Crisis[];
  private _selectedId: number;
  private _sub: Subscription;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute,
    private router: Router,
    private _http: Http) { }

  public ngOnInit() {
<<<<<<< HEAD
    alert((<shared.HttpService>this._http).owner);
=======
    alert((<core.HttpService>this._http).owner);
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
    this._sub = this.route
      .params
      .subscribe(params => {
        this._selectedId = +params['id'];
        this.service.getCrises()
          .then(crises => this._crises = crises);
      });
  }

  public ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }
  private isSelected(crisis: Crisis) { return crisis.id === this._selectedId; }

  private onSelect(crisis: Crisis) {
    // Navigate with Absolute link
    this.router.navigate(['/crises', crisis.id]);
  }
}

