import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
<<<<<<< HEAD

// Lazy loading modules
=======
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TeamMemberComponent } from './team-member/about-us.component';  // Import TeamMemberComponent
import { CampaignComponent } from './campaign/campaign.component';

>>>>>>> cc50595508824b4b73583213e523aafc48e38ff3
const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./profile/profile.module').then(x => x.ProfileModule);


const routes: Routes = [
    { path: '', redirectTo: '/landing-page', pathMatch: 'full' }, // Redirect root to landing-page
    { path: 'landing-page', component: LandingPageComponent },  // Public route
    { path: 'team-member', component: TeamMemberComponent },  // Add route for About Us
    { path: 'campaign' , component: CampaignComponent},

    // Protected route with AuthGuard for home
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },

    // Lazy-loaded account module, login-register doesn't need AuthGuard
    { path: 'account', loadChildren: accountModule },

    // Protected profile routes, only for authenticated users
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },

    // Admin routes, restricted by role using the data property
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // Catch-all redirect for invalid routes
    { path: '**', redirectTo: '/landing-page', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
