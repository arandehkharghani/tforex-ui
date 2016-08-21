import { NgModule,
    ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }        from '@angular/forms';

import { AuthGuardService, AuthService,
    CanDeactivateGuardService, ErrorComponent,
    HttpService, DialogService, httpServiceProvider }         from '../shared';

@NgModule({
    imports: [CommonModule],
    declarations: [
        ErrorComponent,
    ],
    exports: [
        ErrorComponent,
        CommonModule,
        FormsModule,
    ],
})
export class SharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AuthGuardService,
                httpServiceProvider,
                CanDeactivateGuardService,
                DialogService,
            ],
        };
    }
}

@NgModule({
    exports: [SharedModule],
    providers: [
        AuthService,
        AuthGuardService,
        httpServiceProvider,
        CanDeactivateGuardService,
        DialogService,
    ],
})

export class SharedRootModule { }
