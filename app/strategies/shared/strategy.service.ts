import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Inject, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { AppSettings, appSettings }                                from '../../shared';

import * as models from '../../strategies';

@Injectable()
export class StrategyService {
    protected basePath = 'http://localhost:10010/';
    public defaultHeaders: Headers = new Headers();

    constructor(protected http: Http, @Inject(appSettings) private _appSettings: AppSettings) {
        if (_appSettings.apiStrategyBasePath) {
            this.basePath = _appSettings.apiStrategyBasePath;
        }
    }

    /**
     * 
     * Returns a list of available strategies
     * @param id The id of a specific strategy
     */
    public get(id?: string, extraHttpRequestParams?: any): Observable<Array<models.Strategy>> {
        const path = this.basePath + '/strategies';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (id !== undefined) {
            queryParameters.set('_id', id);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters,
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }

    /**
     * 
     * adds a new strategy
     * @param strategy the complete strategy object
     */
    public post(strategy: models.Strategy, extraHttpRequestParams?: any): Observable<models.Strategy> {
        const path = this.basePath + '/strategies';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'strategy' is set
        if (!strategy) {
            throw new Error('Missing required parameter strategy when calling post');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters,
        };
        requestOptions.body = JSON.stringify(strategy);

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }
    public signin() {
         const path = this._appSettings.apiGatewayBasePath + '/auth/google';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters,
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }
}
