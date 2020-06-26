import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AppComponent } from './app.component';


const routes : Routes = [
    { path: '', 
      component: AppComponent,
      canActivate:[AuthGuard]
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
