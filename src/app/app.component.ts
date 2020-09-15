import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { User } from './models/user.model';
import * as EquipamentActions from './redux/equipament/equipament.actions';
import * as ComputerActions from './redux/computer/computer.actions';
import * as BrandActions from './redux/brand/brand.actions';
import * as CategoryActions from './redux/category/category.actions';
import * as FloorActions from './redux/floor/floor.actions';
import * as ModelActions from './redux/model/model.actions';
import * as UaActions from './redux/ua/ua.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-app';
  user: User;
  lastUpdate: number;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private readonly store: Store<AppState>) {
    iconRegistry.addSvgIcon(
      'menu-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/menu/menu-icon@1px.svg'));
    iconRegistry.addSvgIcon(
      'search-icon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/search/search-icon@1px.svg'));
    iconRegistry.addSvgIcon(
      'logo-nav',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/logo/logo-nav@1px.svg'));
    iconRegistry.addSvgIcon(
      'apps',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/apps-white@1px.svg'));
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/home-white@1px.svg'));
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/logout-white@1px.svg'));  
    iconRegistry.addSvgIcon(
      'users',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/multiple-white@1px.svg'));
    iconRegistry.addSvgIcon(
      'chart',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/chart-white@1px.svg'));
    //Carrega os equipamentos e computadores armazenados no servidor.
    this.store.dispatch(BrandActions.loadBrands());
    this.store.dispatch(CategoryActions.loadCategories());
    this.store.dispatch(FloorActions.loadFloors());
    this.store.dispatch(ModelActions.loadModels());
    this.store.dispatch(UaActions.loadUas());
    this.store.dispatch(EquipamentActions.loadEquipaments());
    this.store.dispatch(ComputerActions.loadComputers());
    this.lastUpdate = Date.now();
  }

  doSearch(query: string){}

}
