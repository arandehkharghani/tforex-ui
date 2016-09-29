import { ComponentFactoryResolver, ResolvedReflectiveProvider,
    Directive, Injector } from '@angular/core';


import { ActivatedRoute, RouterOutlet, RouterOutletMap, Router } from '@angular/router';

@Directive({
    selector: '[tfrxRouterOutlet]',
})

export class TForextRouterOutletDirective extends RouterOutlet {
    public activate(activatedRoute: ActivatedRoute, loadedResolver: ComponentFactoryResolver,
        loadedInjector: Injector, providers: ResolvedReflectiveProvider[], outletMap: RouterOutletMap): void {
        activatedRoute.url.subscribe(x => {
            let route = <any>activatedRoute;
            let url = route._routerState.snapshot.url;
            super.activate(activatedRoute, loadedResolver, loadedInjector,
                providers, outletMap);
        });
    }
}

