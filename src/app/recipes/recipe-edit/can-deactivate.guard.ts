import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface CanDeactivateComponent {
  canDeactivate(): boolean
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {
  
    canDeactivate(
      component: CanDeactivateComponent, 
      currentRoute: ActivatedRouteSnapshot, 
      currentState: RouterStateSnapshot, 
      nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

      return component.canDeactivate();
    }
  
}
