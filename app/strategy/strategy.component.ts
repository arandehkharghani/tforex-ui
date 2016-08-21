import { Component }            from '@angular/core';

import * as shared from '../shared';

import { StrategyService } from '../strategy';

@Component({
  template: `
    <h2>Strategies</h2>
    <router-outlet></router-outlet>
  `,
})

export class StrategyComponent {}

