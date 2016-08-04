import { provideRouter, RouterConfig }  from '@angular/router';

import { crisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { heroesRoutes }       from './heroes/heroes.routes';

import { strategyCentreRoutes }       from './strategies/strategy-centre.routes';

import { loginRoutes,
  AUTH_PROVIDERS }     from './login/login.routes';

import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

export const routes: RouterConfig = [
  ...heroesRoutes,
  ...loginRoutes,
  ...crisisCenterRoutes,
  ...strategyCentreRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
  AUTH_PROVIDERS,
  CanDeactivateGuard,
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
