import { RouterConfig }          from '@angular/router';

import { StrategyCentreComponent } from './strategy-centre.component';
import { StrategyListComponent } from './strategy-list/strategy-list.component';

export const strategyCentreRoutes: RouterConfig = [
  {
    path: '',
    redirectTo: '/strategy-centre',
    terminal: true,
  },
  {
    path: 'strategy-centre',
    component: StrategyCentreComponent,
    children: [
      {
        path: '',
        component: StrategyListComponent,
      },
    ],
  },
];
