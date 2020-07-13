import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './user/user.model';

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
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/apps.svg'));
    iconRegistry.addSvgIcon(
      'home',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/home-minimal.svg'));
    iconRegistry.addSvgIcon(
      'logout',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/logout-icon.svg'));  
    iconRegistry.addSvgIcon(
      'users',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/multiple-19.svg'));
    iconRegistry.addSvgIcon(
      'chart',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/nav/chart-pie-36.svg'));
  }

  doSearch(query: string){}

}
