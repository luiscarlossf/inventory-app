import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BackendService } from './backend/backend.service';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './redux/user/user.reducer';
import { GroupsReducer } from './redux/group/group.reducer';
import { HomeComponent } from './home/home.component';
import { UserEffects } from './redux/user/user.effects';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { SearchBoxComponent } from './search-box/search-box.component';
import { NavMenuComponent } from './layout/nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBoxComponent,
    NavMenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    StoreModule.forRoot({
      user: fromUser.reducer,
      groups: GroupsReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
  ],
  providers: [
    BackendService,
    httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
