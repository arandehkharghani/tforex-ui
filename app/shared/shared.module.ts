import { NgModule,
    ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }        from '@angular/forms';

import * as shared from '../shared';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        shared.ErrorComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        shared.ErrorComponent,
    ],
})
<<<<<<< HEAD
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

<<<<<<< HEAD
=======
/*
>>>>>>> 21b2cb7... updated RC5 to RC6, fixed http service DI issue
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
=======
export class SharedModule { }
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
