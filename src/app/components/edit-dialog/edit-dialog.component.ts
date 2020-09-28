import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Computer } from 'src/app/models/computer.model';
import { Equipament } from 'src/app/models/equipament.model';
import { Floor } from 'src/app/models/floor.model';
import { Model } from 'src/app/models/model.model';
import { Ua } from 'src/app/models/ua.model';
import { environment } from 'src/environments/environment';
import * as fromBrand from '../../redux/brand/brand.reducer';
import * as fromCategory from '../../redux/category/category.reducer';
import * as fromModel from '../../redux/model/model.reducer';
import * as fromUa from '../../redux/ua/ua.reducer';
import * as fromFloor from '../../redux/floor/floor.reducer';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  brands$: Observable<string[]>;
  categories$: Observable<string[]>;
  models$: Observable<string[]>;
  uas$: Observable<string[]>;
  floors$: Observable<string[]>;
  status = environment.status;
  servers_options = environment.servers_options;
  editForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Equipament | Computer, 
              fb: FormBuilder,
              private readonly store: Store<AppState>, private dialog: MatDialog, public dialogRef: MatDialogRef<EditDialogComponent>) { 
    
    this.brands$ = this.store.select(fromBrand.selectAllIDs);                
    this.categories$ = this.store.select(fromCategory.selectAllIDs);
    this.models$ = this.store.select(fromModel.selectAllIDs);
    this.uas$ = this.store.select(fromUa.selectAllIDs);
    this.floors$ = this.store.select(fromFloor.selectAllIDs);
    this.editForm = fb.group({
      'patrimony': [data.patrimony,],
      'brand': [data.brand],
      'category': [data.category],
      'model': [data.model],
      'ua': [data.ua],
      'floor': [data.floor ],
      'warranty_start': [data.warranty_start, ],
      'warranty_end': [data.warranty_end, ],
      'acquisition_date': [data.acquisition_date, ],
      'acquisition_value': [data.acquisition_value, ],
      'policy': ['', ],
      'status': [data.status,],
      'status_wsus': ['', ],
      'status_trend': ['',],
      'status_zenworks': ['',],
    });
    this.editForm.controls['patrimony'].disable();
    this.editForm.controls['brand'].disable();
    this.editForm.controls['category'].disable();
    this.editForm.controls['model'].disable();
    this.editForm.controls['ua'].disable();
    if (this.editForm.controls['category'].value.includes('COMPUTADOR')){
      this.editForm.controls['policy'].setValue( (data as Computer).policy);
      this.editForm.controls['status_zenworks'].setValue( (data as Computer).status_zenworks);
      this.editForm.controls['status_wsus'].setValue( (data as Computer).status_wsus);
      this.editForm.controls['status_trend'].setValue( (data as Computer).status_trend);
    }
  }

  ngOnInit(): void {
  }

  edit(form: Equipament){
    const confirmRef = this.dialog.open(ConfirmDialogComponent, 
      {data: {title: 'Tem certeza?', message:'Editando o equipamento com patrimônio ' + this.editForm.controls['patrimony'].value}});
    confirmRef.afterClosed().subscribe(result => {
      if(result === true){
        this.dialogRef.close(form);
      }
    });
  }

}
