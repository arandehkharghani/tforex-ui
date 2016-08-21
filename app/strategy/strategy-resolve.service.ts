import { Injectable }             from '@angular/core';
import { Router, Resolve,
    ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs/Observable';

import { Strategy, StrategyService } from '../strategy';

@Injectable()
export class StrategyResolveService implements Resolve<Strategy> {
    constructor(private _strategyService: StrategyService, private router: Router) { }

    public resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        let id = route.params['id'];
        return this._strategyService.get(id).subscribe(
            strategies => {
                if (strategies && strategies.length === 1) {
                    return strategies[0];
                } else { // id not found
                    this.router.navigate(['/strategies']);
                    return false;
                }
            });
    }
}
