import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const account = this.accountService.accountValue;
        if (account) {
            // Check if the route is restricted by role
            if (route.data.roles && !route.data.roles.includes(account.acc_role)) {
                // Role not authorized, so redirect to the appropriate dashboard
                this.router.navigate([account.acc_role === 'Admin' ? '/admin' : '/']);
                return false;
            }
    
            // Authorized, so return true
            return true;
        }
    
        // Not logged in, redirect to login page
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }    
}
