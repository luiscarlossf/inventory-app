import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EquipamentsComponent } from './pages/equipaments/equipaments.component';
import { AuthGuard } from './auth/auth.guard';
import { PagesModule } from './pages/pages.module';


const routes : Routes = [
    { path: '', 
      component: HomeComponent,
      canActivate:[AuthGuard],
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'equipaments',
      component: EquipamentsComponent,
      canActivate: [AuthGuard],
    },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
