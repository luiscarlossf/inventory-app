import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { environment } from 'src/environments/environment';
import * as fromBrand from '../../redux/brand/brand.reducer';
import * as fromCategory from '../../redux/category/category.reducer';
import * as fromModel from '../../redux/model/model.reducer';
import * as fromUa from '../../redux/ua/ua.reducer';
import * as fromFloor from '../../redux/floor/floor.reducer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Equipament } from 'src/app/models/equipament.model';
import * as utils from 'src/utils';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-insert-dialog',
  templateUrl: './insert-dialog.component.html',
  styleUrls: ['./insert-dialog.component.css']
})
export class InsertDialogComponent implements OnInit {
  brands$: Observable<string[]>;
  categories$: Observable<string[]>;
  models$: Observable<string[]>;
  uas$: Observable<string[]>;
  floors$: Observable<string[]>;
  status = environment.status;
  servers_options = environment.servers_options;
  insertForm: FormGroup;

  constructor( private readonly store: Store<AppState>, 
    fb: FormBuilder, private dialog: MatDialog, 
    public dialogRef: MatDialogRef<InsertDialogComponent>, 
    private general: GeneralService) {
       
    this.brands$ = this.store.select(fromBrand.selectAllIDs);                
    this.categories$ = this.store.select(fromCategory.selectAllIDs);
    this.models$ = this.store.select(fromModel.selectAllIDs);
    this.uas$ = this.store.select(fromUa.selectAllIDs);
    this.floors$ = this.store.select(fromFloor.selectAllIDs);
    this.insertForm = fb.group({
      'patrimony': [''],
      'brand': [''],
      'category': [''],
      'model': [''],
      'ua': [''],
      'floor': [''],
      'warranty_start': [''],
      'warranty_end': [''],
      'acquisition_date': [''],
      'acquisition_value': [''],
      'policy': [''],
      'status': [''],
      'status_wsus': [''],
      'status_trend': [''],
      'status_zenworks': [''],
    });
  }

  add(form: Equipament){
    const confirmRef = this.dialog.open(ConfirmDialogComponent, 
      {data: {title: 'Tem certeza?', message:`Adicionando o equipamento com patrimônio ${form.patrimony}`}});
    confirmRef.afterClosed().subscribe(result => {
      if(result === true){
        this.dialogRef.close(form);
      }
    });
  }

  isComputer(): boolean{
    let category = this.insertForm.controls['category'];
    if(category.value)
      return this.general.getCategory(category.value).name.includes(utils.COMPUTER_ID);
    else
      return false;
  }

  ngOnInit(): void {
  }

}
