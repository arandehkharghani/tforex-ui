import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as shared from '../../../shared';

@Component({
    selector: 'sg-error',
    template: `
<div class="alert alert-danger" *ngFor='let error of _errors'>
    <a href="#" class="close" data-dismiss="alert" aria-label="close"(click)='onCloseAlert(error)'>&times;</a>
    <span *ngIf='isTypeGeneric(error.type)'>{{error.data}}</span>
    <span *ngIf='!isTypeGeneric(error.type)'>
        <div *ngFor='let validationError of error.data'>
            <strong>{{validationError.PropertyName}}:</strong>  {{validationError.Message}}
        </div>
    </span>
</div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ErrorComponent implements OnInit, OnDestroy {
    private _errors: shared.Error[] = [];
    private _subscription: Subscription;

    constructor(private _http: Http, private _cdr: ChangeDetectorRef) {
        let o = { key1: 'value1', key2: 'value2' };

        label:
        for (let v in o) {
            if (v) {
                console.log(v);
                console.log(o[v]);
            } else {
                break label;
            }
        }
    }


    public ngOnInit() {
        this._subscription = (<shared.HttpService>this._http).error$.subscribe(
            error => {
                this._errors.push(error);
                this._cdr.markForCheck();
            });
    }
    public ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
    private onCloseAlert(error: shared.Error) {
        this._errors.splice(this._errors.indexOf(error), 1);
        this._cdr.markForCheck();
    }
    private isTypeGeneric(type: shared.ErrorTypeEnum) {
        return type === shared.ErrorTypeEnum.generic;
    }
}
