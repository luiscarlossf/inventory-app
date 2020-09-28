import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { NavLink } from '../../models/nav-link.model';
import * as UserActions from '../../redux/user/user.actions';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  links: NavLink[];
  currentPage: number;

  constructor(private readonly store: Store<AppState>, private router: Router) { 
    this.currentPage = 1;
    this.links = [
      {title: "HOME", icon: 'home', url: ['/'], tip: 'Páginal Inicial'},
      {title: "EQUIPAMENTOS", icon: 'apps', url: ['/equipaments'], tip: 'Lista de equipamentos'},
      {title: "RELATÓRIOS", icon: 'pie_chart', tip: 'Relatórios sobre os equipamentos'},
      {title: "USUÁRIOS", icon: 'people', tip: 'Lista de usuários do sistema'},
    ];
  }

  ngOnInit(): void {
  }

  logout(): void {
    
    this.store.dispatch(UserActions.logout());
  }

}
