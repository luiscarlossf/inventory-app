import { Component, OnInit } from '@angular/core';
import { NavLink } from '../../models/nav-link.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  links: NavLink[];
  currentPage: number;

  constructor() { 
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

}
