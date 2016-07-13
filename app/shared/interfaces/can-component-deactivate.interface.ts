import { CanDeactivate } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/