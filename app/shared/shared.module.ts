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
    ],
    exports: [
        CommonModule,
        FormsModule,
    ],
})
export class SharedModule { }
