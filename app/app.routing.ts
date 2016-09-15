import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/strategies', pathMatch: 'full' },
  { path: 'strategies', loadChildren: 'app/strategy/strategy.module#StrategyModule' },
  { path: 'login', loadChildren: 'app/login/login.module' },
  { path: 'crises', loadChildren: 'app/crisis/crisis.module' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module' },
];
export const routing = RouterModule.forRoot(routes);