import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent} from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { EquipamentsComponent } from './equipaments/equipaments.component';
import { MatIconModule } from '@angular/material/icon';
import { LayoutsModule } from '../layouts/layouts.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    EquipamentsComponent,
  ],
  exports: [
    HomeComponent,
    EquipamentsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    LayoutsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
