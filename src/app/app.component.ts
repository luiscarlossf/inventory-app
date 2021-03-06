import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { User } from './models/user.model';
import * as fromUser from './redux/user/user.reducer';
import{ enableMapSet }from 'immer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { EquipamentsComponent } from './pages/equipaments/equipaments.component';
import { AuthService } from './auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'inventory-app';
  user: User;
  user$: Observable<User>;
  lastUpdate: number;
  isLogged$: Observable<boolean>;
  @ViewChild(EquipamentsComponent, {static: true})
  equipamentsPage: EquipamentsComponent;
  @ViewChild(MatSidenav, {static: true})
  sideNav: MatSidenav;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private readonly store: Store<AppState>, private router: Router, private auth: AuthService){
    //Habilita o MapSet do immer para ser usado nos reducers.
    //A partir da version 6, essa tarefa é necessária.
    enableMapSet();
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
    this.user$ = this.store.select(fromUser.selectCurrentUser);
    this.isLogged$ = this.store.select(fromUser.isLoggedUser);
  }

  doSearch(e: string){
    this.router.navigate(['/equipaments', {query: e}]);
  }

  ngOnInit(): void{
    this.user$.subscribe(user =>{
      this.user = user;
    });

    this.isLogged$.subscribe(value => {
      if(value == false){
        this.sideNav.close();
      }
    });
    this.lastUpdate = Date.now();
  }
}
