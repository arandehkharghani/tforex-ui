import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';


import * as strategy from '../../strategies';
import * as shared from '../../shared';

@Component({
    templateUrl: 'app/strategies/strategy-list/strategy-list.component.html',
})
export class StrategyListComponent implements OnInit, OnDestroy {

    private _strategies: strategy.Strategy[] = [];
    private _strategiesSubscription: Subscription;
    private _selectedId: string;

    private _router: Router;

    constructor(
        private _service: strategy.StrategyService
    ) { }

    public ngOnInit() {
        this._strategiesSubscription = this._service.get().subscribe(
            strategies => this._strategies = strategies,
            error => console.log('COMPONENT', error)
        );
    }
    public ngOnDestroy() {
        if (this._strategiesSubscription) {
            this._strategiesSubscription.unsubscribe();
        }
    }

    private isSelected(strategy: strategy.Strategy) { return strategy.id === this._selectedId; }

    private onSelect(strategy: strategy.Strategy) {
        // Navigate with Absolute link
        this._router.navigate(['/strategy-center', strategy.id]);
    }
}
