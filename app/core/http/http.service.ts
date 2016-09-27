import { Injectable, ReflectiveInjector, Injector, forwardRef  } from '@angular/core';
import { Http, Request, Response, XHRBackend, RequestOptions, ConnectionBackend, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import * as shared from '../../shared';

export const httpServiceProvider = {
    provide: Http, useFactory: forwardRef(() => (backend: XHRBackend, defaultOptions: RequestOptions) =>
        new HttpService(backend, defaultOptions)), deps: [XHRBackend, RequestOptions],
};


@Injectable()
export class HttpService extends Http {
    public owner: string;
    public _error$: Subject<shared.Error>;
    private _dataStore: {
        errors: shared.Error[]
    };

    get error$() {
        return this._error$.asObservable();
    }

    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
        this._dataStore = { errors: [] };
        this._error$ = <Subject<shared.Error>>new Subject();
        console.log('$ initialised');
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, options)
            .catch((err) => this.handleError(err));
    }
    /**
     * Performs a request with `post` http method.
     */
    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, options)
            .catch(err => this.handleError(err));
    }
    /**
     * Performs a request with `put` http method.
     */
    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, options)
            .catch(err => this.handleError(err));
    }
    /**
     * Performs a request with `delete` http method.
     */
    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, options)
            .catch(err => this.handleError(err));
    }
    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options)
            .catch(err => this.handleError(err));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    /**
     * sends the error to the http-error-handler (provided by the same consumer) to handle, 
     */
    private handleError(err: Response) {
        let currentError: shared.Error = new shared.Error();
        let error = err.json();
        let errorMessage = '';

        if (!error) {
            currentError.type = shared.ErrorTypeEnum.generic;
            currentError.message = 'NullErrorObject';
        } else {
            if (error.message) {
                // a handled error from a remote api call
                currentError.type = shared.ErrorTypeEnum.generic;
                currentError.errorCode = error.code || err.statusText;
                currentError.statusCode = error.statusCode || err.status;
                currentError.message = error.message;
            } else {
                currentError.type = shared.ErrorTypeEnum.generic;
                currentError.message = error;
            }

            this._dataStore.errors.push(currentError);
            console.log(`owner ${this.owner} is to get notified!`);
            this._error$.next(currentError);
            return Observable.throw(currentError);
        }
    }
}
