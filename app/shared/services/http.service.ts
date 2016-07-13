import { Injectable, ReflectiveInjector, Injector  } from '@angular/core';
import { Http } from '@angular/http';
import { Request } from '@angular/http/src/static_request';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Observable';
import { XHRBackend, RequestOptions } from '@angular/http';
import { ConnectionBackend, RequestOptionsArgs } from '@angular/http/src/interfaces';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import * as shared from '../../shared';

export let HTTP_SERVICE_PROVIDER =
    {
        provide: Http, useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) =>
            new HttpService(backend, defaultOptions),
        deps: [XHRBackend, RequestOptions]
    }


@Injectable()
export class HttpService extends Http {
     private _error$: Subject<shared.Error>;
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
            currentError.data = 'NullErrorObject';
        }
        else if (error.Error != undefined && error.Error == true) {
            // a handled error from a remote api call
            if (error.ValidationResult && error.ValidationResult.ValidationErrors) {
                // this is a validation error
                currentError.type = shared.ErrorTypeEnum.validation;
                currentError.data = error.ValidationResult.ValidationErrors;
            }
            else {
                currentError.type = shared.ErrorTypeEnum.generic;
                currentError.data = error.Message;
            }
        }
        else {
            currentError.type = shared.ErrorTypeEnum.generic;
            currentError.data = 'MissingErrorProperty';            
        }

        this._dataStore.errors.push(currentError);
        this._error$.next(currentError);
        return Observable.throw(currentError);
    }
}
