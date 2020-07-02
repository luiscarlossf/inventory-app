import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BackendService } from './backend/backend.service';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user/user.reducer';
import { GroupsReducer } from './group/group.reducer';
import { HomeComponent } from './home/home.component';
import { UserEffects } from './user/user.effects';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
