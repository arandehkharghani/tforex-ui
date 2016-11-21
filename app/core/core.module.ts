import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import * as core from '../core';

@NgModule({
    imports: [CommonModule],
    declarations: [
        core.TForextRouterOutletDirective,
        core.ErrorComponent,
    ],
    exports: [
        core.TForextRouterOutletDirective,
        core.ErrorComponent,
    ],
    providers: [
        { provide: core.appSettings, useValue: core.constAppSettings },
        core.httpServiceProvider,
        core.AuthService,
        core.AuthGuardService,
        core.AuthAdminGuardService,
        core.CanDeactivateGuardService,
        core.DialogService,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        core.InstrumentDataService,
        core.InstrumentService,
    ],
})
export class CoreModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: core.appSettings, useValue: core.constAppSettings },
                core.httpServiceProvider,
                core.AuthService,
                core.AuthGuardService,
                core.AuthAdminGuardService,
                core.CanDeactivateGuardService,
                core.DialogService,
                { provide: LocationStrategy, useClass: HashLocationStrategy },
                core.InstrumentDataService,
                core.InstrumentService,
            ],
        };
    }
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}


