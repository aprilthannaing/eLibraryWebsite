import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Home1Component } from './home1/home1.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { Header2Component } from './header2/header2.component';
import { Forgetpassword2Component } from './forgetpassword2/forgetpassword2.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home1', component: Home1Component },
  { path: 'home', component: HomeComponent },
  { path: 'book-detail', component: BookDetailComponent},
  { path: 'book-list', component: BookListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'forgetpassword', component: ForgetpasswordComponent},
  { path: 'header2', component: Header2Component},
  { path: 'forgetpassword2', component: Forgetpassword2Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
