import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as admin from '../../admin';
import * as shared from '../../shared';
import * as core from '../../core';


@Component({
    moduleId: module.id,
    templateUrl: 'instrument-list.component.html',
})
export class InstrumentListComponent implements OnInit, OnDestroy {
    private _selectedInstrument: core.Instrument;
    private _sub: Subscription;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
    }

    public ngOnInit() {
        this._sub = this._route
            .params
            .subscribe(params => {
                this._selectedInstrument = params['instrument'];
            });
    }
    public ngOnDestroy() {
        if (this._sub) {
            this._sub.unsubscribe();
        }
    }
}
