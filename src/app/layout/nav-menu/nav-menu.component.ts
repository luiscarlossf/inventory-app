import { Component, OnInit } from '@angular/core';
import { NavLink } from './nav-link.model';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  links: NavLink[];

  constructor() { 
    this.links = [
      {title: "HOME", icon: 'home', url: '/', tip: 'Páginal Inicial'},
      {title: "EQUIPAMENTOS", icon: 'apps'},
      {title: "RELATÓRIOS", icon: 'chart'},
      {title: "USUÁRIOS", icon: 'users'},
    ];
  }

  ngOnInit(): void {
  }

}
