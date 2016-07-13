import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import { Strategy } from '../../strategies';

@Injectable()
export class StrategyService {
    protected basePath = 'http://localhost:10010';
    public defaultHeaders : Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        if (basePath) {
            this.basePath = basePath;
        }
    }

    /**
     * 
     * Returns a list of available strategies
     * @param id The id of a specific strategy
     */
    public get (id?: string, extraHttpRequestParams?: any ) : Observable<Array<Strategy>> {
        const path = this.basePath + '/strategies';
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (id !== undefined) {
            queryParameters.set('_id', id);
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => response.json());
    }
}
