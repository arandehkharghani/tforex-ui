import { NgModule }           from '@angular/core';
import { SharedModule }       from '../shared';

import * as login            from '../login';

@NgModule({
  imports:      [ SharedModule, login.routing ],
  declarations: [ login.LoginComponent ],
})
export default class LoginModule { }
