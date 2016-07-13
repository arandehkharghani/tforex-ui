import * as enums from '../../shared';


export interface ErrorResponse {
    message?: string;
}

export class Error {
    type: enums.ErrorTypeEnum;
    data: any;
}