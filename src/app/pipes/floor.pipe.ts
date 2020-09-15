import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromFloor from '../redux/floor/floor.reducer';

@Pipe({
  name: 'floor',
  pure: false,
})
export class FloorPipe implements PipeTransform {

  constructor(private readonly store: Store<AppState>){}

  transform(value: string): string {
    let floor$ = this.store.select(fromFloor.selectFloorByKey, {key:value});
    let name: string;
    floor$.subscribe(floor =>{
      name = floor? floor.name : '';
    });
    return name;
  }


}
