import * as enums from '../../shared';


export interface ErrorResponse {
    message?: string;
}

export class Error {
    public type: enums.ErrorTypeEnum;
    public data: any;
}
