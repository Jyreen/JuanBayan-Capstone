import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        IonicModule.forRoot()  // Add this line to import IonicModule

    ],
    declarations: [
        SubNavComponent,
        LayoutComponent,
        OverviewComponent

    ]
})
export class AdminModule { }