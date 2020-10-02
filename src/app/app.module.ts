import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from "./auth/auth.module";
import { AppComponent } from './app.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { BackendService } from './services/backend/backend.service';
import { StoreModule } from '@ngrx/store';
import * as fromUser from './redux/user/user.reducer';
import * as fromBrand from './redux/brand/brand.reducer';
import * as fromCategory from './redux/category/category.reducer';
import * as fromComputer from './redux/computer/computer.reducer';
import * as fromEquipament from './redux/equipament/equipament.reducer';
import * as fromFloor from './redux/floor/floor.reducer';
import * as fromGroup from './redux/group/group.reducer';
import * as fromModel from './redux/model/model.reducer';
import * as fromUa from './redux/ua/ua.reducer';
import { UserEffects } from './redux/user/user.effects';
import { BrandEffects } from './redux/brand/brand.effects';
import { CategoryEffects } from './redux/category/category.effects';
import { ComputerEffects } from './redux/computer/computer.effects';
import { EquipamentEffects } from './redux/equipament/equipament.effects';
import { FloorEffects } from './redux/floor/floor.effects';
import { ModelEffects } from './redux/model/model.effects';
import { UaEffects } from './redux/ua/ua.effects';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from '../app/pages/pages.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ComponentsModule } from './components/components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GeneralService } from './services/general/general.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    ComponentsModule,
    LayoutsModule,
    PagesModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    StoreModule.forRoot({
      user: fromUser.reducer,
      groups: fromGroup.GroupsReducer,
      brands: fromBrand.reducer,
      categories: fromCategory.reducer,
      models: fromModel.reducer,
      floors: fromFloor.reducer,
      uas: fromUa.reducer,
      equipaments: fromEquipament.reducer,
      computers: fromComputer.reducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      BrandEffects,
      CategoryEffects,
      ComputerEffects,
      EquipamentEffects,
      FloorEffects,
      ModelEffects,
      UaEffects,
    ]),
  ],
  providers: [
    BackendService,
    GeneralService,
    httpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy},
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
