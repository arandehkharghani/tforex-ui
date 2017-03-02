import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams, RequestMethod, RequestOptions } from '@angular/http';
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
    public syncCandles(instrument: core.InstrumentEnum, granularity: core.GranularityEnum) {
        const path = this.basePath + `/candles`;
        let extraHttpRequestParams = { withCredentials: true };
        let request = {
            instrument: instrument,
            granularity: granularity,
        };

        let queryParameters = new URLSearchParams();
        let headers = new Headers(this.defaultHeaders.toJSON()); // https://github.com/angular/angular/issues/6845
        // verify required parameter 'createCandlesRequest' is not null or undefined
        if (request.instrument === null || request.instrument === undefined ||
            request.granularity === null || request.granularity === undefined) {
            throw new Error('Required parameter createCandlesRequest was null or undefined when calling createCandles.');
        }

        // to determine the Content-Type header
        let consumes: string[] = [
            'application/json',
        ];

        // to determine the Accept header
        let produces: string[] = [
            'application/json',
        ];

        headers.set('Content-Type', 'application/json');


        let requestOptions: RequestOptionsArgs = new RequestOptions({
            method: RequestMethod.Post,
            headers: headers,
            body: JSON.stringify(request),
            // https://github.com/angular/angular/issues/10612
            search: queryParameters,
        });

        // https://github.com/swagger-api/swagger-codegen/issues/4037
        if (extraHttpRequestParams) {
            requestOptions = this.extendObj(requestOptions, extraHttpRequestParams);
        }

        return this.http.request(path, requestOptions);
    }

    private extendObj<T1, T2>(objA: T1, objB: T2) {
        for (let key in objB) {
            if (objB.hasOwnProperty(key)) {
                objA[key] = objB[key];
            }
        }
        return <T1 & T2>objA;
    }
}