import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule
    ],
    declarations: [
        LayoutComponent,
        ProfileComponent
    ]
})
export class ProfileModule { }