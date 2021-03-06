import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsertDialogComponent } from './insert-dialog/insert-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './card/card.component';
import { ServerCardsComponent } from './server-cards/server-cards.component';
import { EquipamentsTableComponent } from './equipaments-table/equipaments-table.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { CardItemComponent } from './card-item/card-item.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';
import { PipesModule } from '../pipes/pipes.module';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    InsertDialogComponent,
    CardComponent,
    ServerCardsComponent,
    EquipamentsTableComponent,
    FiltersComponent,
    SearchBoxComponent,
    CardItemComponent,
    EditDialogComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    InsertDialogComponent,
    CardComponent,
    ServerCardsComponent,
    EquipamentsTableComponent,
    FiltersComponent,
    SearchBoxComponent,
    CardItemComponent,
  ],
  entryComponents: [
    EditDialogComponent,
    InsertDialogComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    PipesModule,
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    FormsModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSortModule,
    MatListModule,
  ]
})
export class ComponentsModule { }
