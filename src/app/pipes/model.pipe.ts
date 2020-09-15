import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromModel from '../redux/model/model.reducer';

@Pipe({
  name: 'model',
  pure: false,
})
export class ModelPipe implements PipeTransform {

  constructor(private readonly store: Store<AppState>){}

  transform(value: string): string {
    let model$ = this.store.select(fromModel.selectModelByKey, {key:value});
    let name: string;
    model$.subscribe(model =>{
      name = model? model.name : '';
    });
    return name;
  }

}
