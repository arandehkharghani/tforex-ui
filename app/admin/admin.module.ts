import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared';

import * as admin from '../admin';

@NgModule({
    imports: [
        admin.routing,
        SharedModule,
    ],
    declarations: [
        admin.AdminComponent,
        admin.AdminNavComponent,
        admin.InstrumentListComponent,
    ],
    providers: [
    ],
})
export class AdminModule {
}
