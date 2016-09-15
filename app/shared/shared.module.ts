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
export class SharedModule { }
