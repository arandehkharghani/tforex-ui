import { NgModule }       from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { SharedModule }   from './shared';
import { constAppSettings, appSettings, CoreModule } from './core';

import { routing }        from './app.routing';
import { AppComponent }   from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        routing,
        CoreModule,
        HttpModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
