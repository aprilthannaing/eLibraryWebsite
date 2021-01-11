import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  obj: any ;
  slides = [
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/3.png"}
  ];
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": false
  };

  slideAuthors = [
    {img: "assets/images/book/1.png"},
    {img: "assets/images/book/2.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/2.png"},
    {img: "assets/images/book/3.png"},
    {img: "assets/images/book/1.png"},
    {img: "assets/images/book/3.png"},
  ];
  slideAuthorsConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false,
  };
  constructor() { 
  }

  ngOnInit(): void {
  }

  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

}
