import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../services/webAPI/user.service";

@Injectable()
export class AuthGuard implements CanActivate{    //implements CanActivate

    constructor(
        private _router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            return true;
        }else{
            // not logged in so redirect to login page with the return url and return false
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}
    
