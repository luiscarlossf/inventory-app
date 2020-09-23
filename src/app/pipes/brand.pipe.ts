import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Brand } from '../models/brand.model';
import * as fromBrand from '../redux/brand/brand.reducer';

@Pipe({
  name: 'brand',
  pure: false,
})
export class BrandPipe implements PipeTransform{

  constructor(private readonly store: Store<AppState>){}

  transform(value: string | Brand): string {
    let name: string;
    let brands$ = this.store.select(fromBrand.selectBrandByKey, {key:value});
    if(typeof(value)=="string"){
      brands$.subscribe(brand =>{
        name = brand? brand.name : '';
      });
    }else{
      name = value.name;
    }
    return name;
  }
}
