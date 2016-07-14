import { Component, provide, Injector }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { Http, XHRBackend, RequestOptions } from '@angular/http';

import { StrategyService } from '../strategies';
import * as shared from '../shared';

@Component({
  template: `
  <my-error></my-error>
  
    <h2>Strategy Centre</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES, shared.ErrorComponent],
  providers: [
    StrategyService,
    shared.HTTP_SERVICE_PROVIDER,
  ],
})

export class StrategyCentreComponent {}

