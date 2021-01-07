import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { IntercomService } from './framework/intercom.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Home1Component } from './home1/home1.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {TabsModule} from "ngx-bootstrap/tabs";
import { HeaderComponent } from './header/header.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookListComponent } from './book-list/book-list.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    Home1Component,
    HeaderComponent,
    BookDetailComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    SlickCarouselModule,
    HttpClientModule
  ],
  providers: [
    IntercomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
