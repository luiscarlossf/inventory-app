import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
})
export class AuthModule { }
