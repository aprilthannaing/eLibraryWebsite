import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Home1Component } from './home1/home1.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { Forgetpassword2Component } from './forgetpassword2/forgetpassword2.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';



const routes: Routes = [
  // { path: '', redirectTo: 'app', pathMatch: 'full' },
  { path: 'home1', component: Home1Component },
  { path: 'home', component: HomeComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'forgetpassword2', component: Forgetpassword2Component },
  { path: 'app', component: AppComponent },
  { path: 'header', component: HeaderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
