import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home1Component } from './home1/home1.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { Forgetpassword2Component } from './forgetpassword2/forgetpassword2.component';
import { HeaderComponent } from './header/header.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: AppComponent},
  { path: 'home1', component: Home1Component },
  { path: 'book-detail', component: BookDetailComponent },
  { path: 'book-detail/:cmd/:id', component: BookDetailComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'book-list/:cmd/:id', component: BookListComponent },
  { path: 'book-list/:cmd/:id/:id1', component: BookListComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'forgetpassword2', component: Forgetpassword2Component },
  { path: 'header', component: HeaderComponent },
  { path: 'category-list', component: CategoryListComponent },
  { path: 'category-list/:cmd/:id', component: CategoryListComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
