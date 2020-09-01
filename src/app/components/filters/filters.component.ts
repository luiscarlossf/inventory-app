import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from 'src/app/models/brand.model';
import { Category } from 'src/app/models/category.model';
import { Status } from 'src/app/models/equipament.model';
import { Floor } from 'src/app/models/floor.model';
import { Model } from 'src/app/models/model.model';
import { Ua } from 'src/app/models/ua.model';

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
  brands: Brand[];
  categories: Category[];
  models: Model[];
  uas: Ua[];
  floors: Floor[];
  status = ['Almoxarifado', 'Doação', 'Sucata', 'Usado'];
  policies = ['Fora da política', 'Dentro da política'];
  servers_options = ['Incluido', 'Fora', 'Sem registro'];
  filtersForm: FormGroup;
  constructor(fb: FormBuilder) {
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
