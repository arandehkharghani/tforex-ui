import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';


import * as strategy from '../strategy';
import * as shared from '../shared';

@Component({
    templateUrl: 'app/strategy/strategy-list.component.html',
})
export class StrategyListComponent implements OnInit, OnDestroy {

    private _strategies: strategy.Strategy[] = [];
    private _selectedId: string;
    private _sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: strategy.StrategyService
    ) { }

    public ngOnInit() {
        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedId = params['id'];
                this._service.get().subscribe(
                    data => this._strategies = data,
                    error => console.log(error));
            });

        // window.location.href = 'http://localhost:10020/auth/google';

        //  this._strategiesSubscription = this._service.signin().subscribe(
        //      strategies => this._strategies = strategies,
        //      error => console.log('COMPONENT', error)
        //  );
    }
    public ngOnDestroy() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }

    private isSelected(strategy: strategy.Strategy) { return strategy.id === this._selectedId; }

    private onSelect(strategy: strategy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategies', strategy.id]);
    }
}
