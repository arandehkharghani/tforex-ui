import * as shared from '../../shared';

export interface ErrorResponse {
    message?: string;
}

export class Error {
    public type: shared.ErrorTypeEnum;
    public errorCode: string;
    public statusCode: string;
    public message: any;
}
