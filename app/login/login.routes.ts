import { AuthService, AuthGuard }        from '../shared';
import { LoginComponent }     from '../login';

export const LoginRoutes = [
  { path: 'login', component: LoginComponent },
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
