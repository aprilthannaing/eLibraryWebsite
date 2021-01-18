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
import { CategoryListComponent } from './category-list/category-list.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

const routes: Routes = [
   { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'home1', component: Home1Component },
  { path: 'home', component: HomeComponent },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'book-detail/:cmd/:id', component: BookListComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-list/:cmd/:id', component: BookListComponent },
  { path: 'book-list/:cmd/:id/:id1', component: BookListComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'forgetpassword2', component: Forgetpassword2Component },
  { path: 'header', component: HeaderComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'category-list/:cmd/:id', component: CategoryListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
