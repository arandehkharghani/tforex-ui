import { Routes,
  RouterModule }  from '@angular/router';

import { StrategyComponent, StrategyListComponent, StrategyViewComponent, StrategyResolveService } from '../strategy';

import { CanDeactivateGuardService, AuthGuardService } from '../core';

const routes: Routes = [
  {
    path: '', component: StrategyComponent, children: [
      {
        path: '', component: StrategyListComponent, canActivate: [AuthGuardService],
      },
      {
        path: ':id', component: StrategyViewComponent, canDeactivate: [CanDeactivateGuardService],
        resolve: { strategy: StrategyResolveService }, canActivate: [AuthGuardService],
      },
      // { path: ':id', component: HeroDetailComponent }
    ],
  },
];

export const routing = RouterModule.forChild(routes);