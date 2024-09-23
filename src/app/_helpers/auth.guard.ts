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

        // Check if user is logged in
        if (account) {
<<<<<<< HEAD
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
=======

            // Check if route is restricted by role
            if (route.data.roles && !route.data.roles.includes(account.acc_role)) {
                // Role not authorized so redirect to the home page
                this.router.navigate(['/landing-page']);
                return false;
            }
            
            // Authorized so return true
            return true;
        }

        this.router.navigate(['/account/login-register'], { queryParams: { returnUrl: state.url }});
        return false;
    }
>>>>>>> cc50595508824b4b73583213e523aafc48e38ff3
}
