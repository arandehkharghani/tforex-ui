import { NgModule }       from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SharedModule }   from './shared';
import { constAppSettings, appSettings, CoreModule } from './core';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { routing }        from './app.routing';
import { AppComponent }   from './app.component';

@NgModule({
<<<<<<< HEAD
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        routing,
        SharedModule.forRoot(),
=======
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        routing,
        CoreModule,
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
        HttpModule,
    ],
    bootstrap: [AppComponent],
    providers: [
<<<<<<< HEAD
        { provide: appSettings , useValue: constAppSettings },
=======
        { provide: LocationStrategy, useClass: HashLocationStrategy },
>>>>>>> 926b300838ea12d9824425e9f174cb05a5a60be0
    ],
})
export class AppModule { }
