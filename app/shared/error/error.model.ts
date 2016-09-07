import * as shared from '../../shared';

export interface ErrorResponse {
    message?: string;
}

export class Error {
    public type: shared.ErrorTypeEnum;
    public data: any;
}
