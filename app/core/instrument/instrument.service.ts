import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';
import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as core from '../../core';

@Injectable()
export class InstrumentService {
    protected basePath = 'http://localhost:10020/';
    public defaultHeaders: Headers = new Headers();

    constructor(protected http: Http, @Inject(core.appSettings) private _appSettings: core.AppSettings) {
        if (_appSettings.apiGatewayBasePath) {
            this.basePath = _appSettings.apiGatewayBasePath;
        }
    }

    /**
     * 
     * Returns a list of instruments
     * @param id The id of a specific instrument
     */
    public getInstruments(id?: string, extraHttpRequestParams?: any): Observable<Array<core.Instrument>> {
        const path = this.basePath + '/instruments';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (id !== undefined) {
            queryParameters.set('_id', String(id));
        }

        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters,
            withCredentials: true,
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }
}