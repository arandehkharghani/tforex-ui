import * as shared from '../../shared';

export interface Strategy {

    id?: string;

    name?: string;

    description?: string;

    createdTime?: Date;

    isActive?: boolean;

    granularity?: shared.GranularityEnum;
}
