import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf }       from '@angular/core';

import { CommonModule }      from '@angular/common';

import * as core from '../core';

@NgModule({
    imports: [CommonModule],
    declarations: [
    ],
    exports: [
    ],
    providers: [
        { provide: core.appSettings , useValue: core.constAppSettings },
        core.AuthService,
        core.AuthGuardService,
        core.httpServiceProvider,
        core.CanDeactivateGuardService,
        core.DialogService,
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
