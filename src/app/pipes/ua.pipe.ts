import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import * as fromUa from '../redux/ua/ua.reducer';

@Pipe({
  name: 'ua',
  pure: false,
})
export class UaPipe implements PipeTransform {

  constructor(private readonly store: Store<AppState>){}

  transform(value: string): string {
    let ua$ = this.store.select(fromUa.selectUaByKey, {key:value});
    let name: string;
    ua$.subscribe(ua =>{
      name = ua? ua.name : '';
    });
    return name;
  }

}
