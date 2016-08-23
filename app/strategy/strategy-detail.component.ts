import { Component, OnInit }      from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable }     from 'rxjs/Observable';

import { DialogService } from '../shared';

import { Strategy } from '../strategy';

@Component({
    template: `
  <div *ngIf="strategy">
    <h3>"{{editName}}"</h3>
    <div>
      <label>Id: </label>{{strategy.id}}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>
  `,
    styles: ['input {width: 20em}'],
})

export class StrategyDetailComponent implements OnInit {
    private _strategy: Strategy;
    private _editName: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public dialogService: DialogService
    ) { }

    public ngOnInit() {
        this.route.data.forEach((data: { strategy: Strategy }) => {
            this._editName = data.strategy.name;
            this._strategy = data.strategy;
        });
    }

    public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        // Allow synchronous navigation (`true`) if no strategy or the strategy is unchanged
        if (!this._strategy || this._strategy.name === this._editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }

    private cancel() {
        this.gotoCrises();
    }

    private save() {
        this._strategy.name = this._editName;
        this.gotoCrises();
    }


    private gotoCrises() {
        let strategyId = this._strategy ? this._strategy.id : null;
        this.router.navigate(['/strategies', { id: strategyId, foo: 'foo' }]);
    }
}