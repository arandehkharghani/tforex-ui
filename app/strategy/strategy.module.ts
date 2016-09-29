import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';

import { SharedModule } from '../shared';

import * as strategy from '../strategy';

@NgModule({
  imports: [
    strategy.routing,
    SharedModule,
  ],
  declarations: [
    strategy.StrategyViewComponent,
    strategy.StrategyListComponent,
    strategy.StrategyComponent,
  ],
  providers: [
    strategy.StrategyResolveService,
    strategy.StrategyService,
  ],
})
export class StrategyModule {
}
