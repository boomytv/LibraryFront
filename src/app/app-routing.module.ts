import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import {MainPageComponent} from "./main-page/main-page.component";
import {AdminLibrariesComponent} from "./admin-libraries/admin-libraries.component";
import {BooksComponent} from "./books/books.component";
import {ReservationsComponent} from "./reservations/reservations.component";


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Libraries', component: AdminLibrariesComponent},
  { path: 'Books', component: BooksComponent },
  { path: 'Reservations', component: ReservationsComponent },
  { path: '**', redirectTo: '/Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
