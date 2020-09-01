import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavMenuComponent,
  ],
  exports: [
    NavMenuComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ]
})
export class LayoutsModule { }
