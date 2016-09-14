import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { FormsModule, ReactiveFormsModule }        from '@angular/forms';

import { SharedModule } from '../shared';

import * as strategy from '../strategy';

@NgModule({
  imports: [
    SharedModule,
    strategy.routing,
  ],
  declarations: [
    strategy.StrategyListComponent,
    strategy.StrategyComponent,
    strategy.StrategyDetailComponent,
  ],
  providers: [
    strategy.StrategyService,
    strategy.StrategyResolveService],
})
export class StrategyModule { }
