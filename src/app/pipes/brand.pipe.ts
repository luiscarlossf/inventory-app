import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../app.state';
import { Brand } from '../models/brand.model';
import * as fromBrand from '../redux/brand/brand.reducer';

@Pipe({
  name: 'brand',
  pure: false,
})
export class BrandPipe implements PipeTransform{

  constructor(private readonly store: Store<AppState>){}

  transform(value: string): string {
    let brands$ = this.store.select(fromBrand.selectBrandByKey, {key:value});
    let name: string;
    brands$.subscribe(brand =>{
      name = brand? brand.name : '';
    });
    return name;
  }
}
