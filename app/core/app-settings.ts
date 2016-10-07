import { OpaqueToken } from '@angular/core';


interface AppSettings {
    apiGatewayBasePath: string;
    productLibFolder: string;
    isFirmStructureLoadOnDemand: boolean;
    cacheExpiryInMinutes: number;
}

const constAppSettings: AppSettings = {
    apiGatewayBasePath: 'http://localhost:10020',
    productLibFolder: 'node_modules',
    isFirmStructureLoadOnDemand: true,
    cacheExpiryInMinutes: 1,
};

let appSettings = new OpaqueToken('app.settings');

export {AppSettings, constAppSettings, appSettings }