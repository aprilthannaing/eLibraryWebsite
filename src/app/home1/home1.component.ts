import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  obj: any ;
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": false
  };

  local_author = [
    {Id: 0,boId: "",name: "",sort: "",profilePicture: "",authorType: ""}
  ];
  international_author = [
    {Id: 0,boId: "",name: "",sort: "",profilePicture: "",authorType: ""}
  ];
  recommend_book:any;
  popular_book:any = [];
  popular_book_temp:any = [];
  latest_book_temp:any = [];
  latest_book:any = [];
  currentRate = 0;

  slideAuthorsConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false,
  };
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService
  ) { 
    this.goHome();
  }
  onImgError(event){
    event.target.src = 'assets/images/notfound.jpg'
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

  goHome() {
    const url = this.ics.apiRoute + '/home';
    const json = {"user_id":"USR1"}
    try {
        this.http.post(url,json,{headers: new HttpHeaders().set('token', this.ics._profile.token)}).subscribe(
            (data:any) => {
              if(data.status){
                  //Local Author
                  this.local_author = data.local_author
                  for(let i=0;i <this.local_author.length; i++){
                    if(this.local_author[i].profilePicture != ""){
                      let profilepicture ="assets/elibrary" + this.local_author[i].profilePicture;
                      profilepicture.replace("\/","/");
                      this.local_author[i].profilePicture =  profilepicture;
                    }else{
                      this.local_author[i].profilePicture = "assets/images/notfound.jpg";
                    }
                  }
                    //International Author
                    this.international_author = data.international_author
                  for(let i=0;i <this.international_author.length; i++){
                    if(this.international_author[i].profilePicture != ""){
                      let profilepicture ="assets/elibrary" + this.international_author[i].profilePicture;
                      profilepicture.replace("\/","/");
                      this.international_author[i].profilePicture =  profilepicture;
                    }else{
                      this.international_author[i].profilePicture = "assets/images/notfound.jpg";
                    }
                  }

                  //Recommanded Book 
                  this.recommend_book = data.recommend_book
                  for(let i=0;i <this.recommend_book.length; i++){
                    if(this.recommend_book[i].coverPhoto != ""){
                      let coverPhoto ="assets/elibrary" + this.recommend_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.recommend_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.recommend_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                  }
                  //popular_book Book 
                  this.popular_book_temp = data.popular_book
                  for(let i=0; i < 2; i++){
                    this.popular_book[i] = this.popular_book_temp[i];
                    if(this.popular_book[i].coverPhoto != ""){
                      let coverPhoto ="assets/elibrary" + this.popular_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.popular_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.popular_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                  }

                  //latest_book Book 
                  this.latest_book_temp = data.latest_book
                  for(let i=0; i < 3; i++){
                    this.latest_book[i] = this.latest_book_temp[i];
                    if(this.latest_book[i].coverPhoto != ""){
                      let coverPhoto ="assets/elibrary" + this.latest_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.latest_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.latest_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                  }
              }
            },
            error => {
                if (error.name == "HttpErrorResponse") {
                    alert("Connection Timed Out!");
                }
                else {
  
                }
            }, () => { });
    } catch (e) {
        alert(e);
    }
  }
  goRecommendBook(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  goPopularBooks(){
    this.router.navigate(['/book-list','new','popularBooks']); 
    this.ics.bookList = this.popular_book_temp;
  }
  goLatestBooks(){
    this.router.navigate(['/book-list','new','latestBooks']); 
    this.ics.bookList = this.latest_book_temp;
  }
  goPopularBook(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  goRecommendBooks(){
    this.router.navigate(['/book-list','new','recommendBooks']); 
    this.ics.bookList = this.recommend_book;
  }
  goBookByAuthors(value){
    this.router.navigate(['/book-list','read',value.boId]); 
    this.ics.titleLink = "Author/" + value.name
  }
}