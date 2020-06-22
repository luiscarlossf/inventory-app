import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BackendService } from './backend.service';
import { appStoreProviders } from './app.store';
import { StoreModule } from '@ngrx/store';
import { UsersReducer } from './user/user.reducer';
import { GroupsReducer } from './group/group.reducer';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      users: UsersReducer,
      groups: GroupsReducer,
    }),
  ],
  providers: [
    AuthService,
    BackendService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
