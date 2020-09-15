import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromCategory from '../redux/category/category.reducer';

@Pipe({
  name: 'category',
  pure: false,
})
export class CategoryPipe implements PipeTransform {

  constructor(private readonly store: Store<AppState>){}

  transform(value: string): string {
    let category$ = this.store.select(fromCategory.selectCategoryByKey, {key:value});
    let name: string;
    category$.subscribe(category =>{
      name = category? category.name : '';
    });
    return name;
  }

}
