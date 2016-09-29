import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import * as core from '../core';

@NgModule({
    imports: [CommonModule],
    declarations: [
        core.TForextRouterOutletDirective,
    ],
    exports: [
        core.TForextRouterOutletDirective,
    ],
    providers: [
        { provide: core.appSettings , useValue: core.constAppSettings },
        core.AuthService,
        core.AuthGuardService,
        core.httpServiceProvider,
        core.CanDeactivateGuardService,
        core.DialogService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
    ],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

