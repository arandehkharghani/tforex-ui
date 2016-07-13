// main entry point
import {provide} from '@angular/core';
import { bootstrap }            from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }         from './app.component';
import { APP_ROUTER_PROVIDERS } from './app.routes';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,  
  APP_ROUTER_PROVIDERS,
])
.catch(err => console.error(err));


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/