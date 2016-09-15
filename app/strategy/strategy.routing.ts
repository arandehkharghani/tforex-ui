import { Routes,
  RouterModule }  from '@angular/router';

import { StrategyComponent, StrategyListComponent, StrategyDetailComponent, StrategyResolveService } from '../strategy';

import { CanDeactivateGuardService } from '../core';

const routes: Routes = [
  {
    path: '', component: StrategyComponent, children: [
      {
        path: '', component: StrategyListComponent,
      },
      {
        path: ':id', component: StrategyDetailComponent, canDeactivate: [CanDeactivateGuardService],
        resolve: { strategy: StrategyResolveService },
      },
      // { path: ':id', component: HeroDetailComponent }
    ],
  },
];

export const routing = RouterModule.forChild(routes);