import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as fromBrand from '../../redux/brand/brand.reducer';
import * as fromCategory from '../../redux/category/category.reducer';
import * as fromModel from '../../redux/model/model.reducer';
import * as fromUa from '../../redux/ua/ua.reducer';
import * as fromFloor from '../../redux/floor/floor.reducer';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Filters{
  brands: string[] | string;
  categories: string[] | string;
  models: string[] | string;
  uas: string[] | string;
  floor: string[] | string;
  warranty_start: string[] | string;
  wwarranty_end: string[] | string;
  min_date: string[] | string;
  max_date: string[] | string;
  min_value: string[] | string;
  max_value: string[] | string;
  policies: string[] | string;
  status: string[] | string;
  status_wsus: string[] | string;
  status_trend: string[] | string;
  status_zenworks: string[] | string;
}

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Output() filters = new EventEmitter<Filters>();
  brands$: Observable<string[]>;
  categories$: Observable<string[]>;
  models$: Observable<string[]>;
  uas$: Observable<string[]>;
  floors$: Observable<string[]>;
  status = environment.status;
  policies = environment.policies;
  servers_options = environment.servers_options;
  filtersForm: FormGroup;
  constructor(private readonly store:Store<AppState>,fb: FormBuilder) {
    this.brands$ = this.store.select(fromBrand.selectAllIDs);                
    this.categories$ = this.store.select(fromCategory.selectAllIDs);
    this.models$ = this.store.select(fromModel.selectAllIDs);
    this.uas$ = this.store.select(fromUa.selectAllIDs);
    this.floors$ = this.store.select(fromFloor.selectAllIDs);
    this.filtersForm = fb.group({
      'brands': [''],
      'categories': [''],
      'models': [''],
      'uas': [''],
      'floors': [''],
      'warranty_start': [''],
      'warranty_end': [''],
      'min_date': [''],
      'max_date': [''],
      'min_value': [''],
      'max_value': [''],
      'policies': [''],
      'status': [''],
      'status_wsus': [''],
      'status_trend': [''],
      'status_zenworks': [''],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this.filters.emit(form);
  }

}
