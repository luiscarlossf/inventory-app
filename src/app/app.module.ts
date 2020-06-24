import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BackendService } from './backend.service';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './user/user.reducer';
import { GroupsReducer } from './group/group.reducer';
import { HomeComponent } from './home/home.component';
import { UserEffects } from './user/user.effects';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { LoggedInGuard } from './login/logged-in.guard';

const routes : Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [ LoggedInGuard ]},
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      user: fromUser.reducer,
      groups: GroupsReducer,
    }),
    EffectsModule.forRoot([UserEffects]),
  ],
  providers: [
    LoggedInGuard,
    AuthService,
    BackendService,
    httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
