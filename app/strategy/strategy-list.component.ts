import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

import * as strategy from '../strategy';
import * as shared from '../shared';
import * as core from '../core';


@Component({
<<<<<<< HEAD
    providers: [
        shared.httpServiceProvider,
        strategy.StrategyService,
    ],
    templateUrl: 'app/strategy/strategy-list.component.html',
=======
    moduleId: module.id,
    providers: [
        core.httpServiceProvider,
        strategy.StrategyService,
    ],
    templateUrl: 'strategy-list.component.html',
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
})
export class StrategyListComponent implements OnInit, OnDestroy {

    private _strategies: strategy.Strategy[] = [];
    private _selectedId: string;
    private _sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _service: strategy.StrategyService,
        private _http: Http
    ) {
<<<<<<< HEAD
        (<shared.HttpService>_http).owner = 'strategies';
=======
        (<core.HttpService>_http).owner = 'strategies';
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
    }

    public ngOnInit() {
        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedId = params['id'];
                this._service.get().subscribe(
                    data => this._strategies = data,
                    error => console.log('ERRRRR')
                );
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
    private onClick() {
        console.log(`http-service owner at component level ${(<any>this._http).owner}`);
        this._service.get().subscribe(
            data => this._strategies = data,
            error => console.log('ERRRRR')
        );
    }
    private isSelected(strategy: strategy.Strategy) { return strategy.id === this._selectedId; }

    private onSelect(strategy: strategy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategies', strategy.id]);
    }
}
