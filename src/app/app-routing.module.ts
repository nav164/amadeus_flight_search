import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightDestinationComponent } from './component/flight-destination/flight-destination.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { AppGuard } from './guards/app.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AppGuard]},
  {path: 'flight', component: FlightDestinationComponent, canActivate: [AppGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
