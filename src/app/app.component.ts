import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'inventory-app';
  user: User;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
  }

  doSearch(query: string){}

}
