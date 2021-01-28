import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  playStoreLink = "";
  appStoreLink = "";
  search = "";
  startDate = "";
  endDate = "";
  obj: any ;
  advertisements = [{"name":"assets/elibrary/Advertisement/simple1.png"},
  {"name":"assets/elibrary/Advertisement/simple1.png"},
  {"name":"assets/elibrary/Advertisement/simple1.png"}];
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": false,
    "responsive":[
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  slideAuthorsConfig = {
    "slidesToShow": 6,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false, 
    "responsive":[
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };
  slideAdvertisementConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false,
    autoplay: true,
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

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService
  ) { 
    this.goHome();
    this.playStoreLink = this.ics.palyStoreLink;
    this.appStoreLink = this.ics.appStoreLink;
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
    const json = {"user_id": this.ics._profile.userId}
    try {
        this.http.post(url,json,{headers: new HttpHeaders().set('token', this.ics._profile.token)}).subscribe(
            (data:any) => {
              if(data.status){
                  //Local Author
                  this.local_author = data.local_author
                  for(let i=0;i <this.local_author.length; i++){
                    if(this.local_author[i].profilePicture != ""){
                      let profilepicture =this.ics.apiRoute1 + this.local_author[i].profilePicture;
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
                      let profilepicture =this.ics.apiRoute1 + this.international_author[i].profilePicture;
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
                      let coverPhoto =this.ics.apiRoute1 + this.recommend_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.recommend_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.recommend_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                    this.recommend_book[i].title1 = this.add3Dots(this.recommend_book[i].title,50 );
                  }
                  //popular_book Book 
                  this.popular_book_temp = data.popular_book
                    let j = 2;
                    if(this.popular_book_temp.length < j)
                      j = this.popular_book_temp.length;
                  for(let i=0; i < j; i++){
                    this.popular_book[i] = this.popular_book_temp[i];
                    if(this.popular_book[i].coverPhoto != ""){
                      let coverPhoto =this.ics.apiRoute1 + this.popular_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.popular_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.popular_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                  }

                  //latest_book Book 
                  this.latest_book_temp = data.latest_book
                  let k = 3;
                  if(this.popular_book_temp.length < k)
                    k = this.popular_book_temp.length;
                  for(let i=0; i < k; i++){
                    this.latest_book[i] = this.latest_book_temp[i];
                    if(this.latest_book[i].coverPhoto != ""){
                      let coverPhoto =this.ics.apiRoute1 + this.latest_book[i].coverPhoto;
                      coverPhoto.replace("\/","/");
                      this.latest_book[i].coverPhoto =  coverPhoto;
                    }else{
                      this.latest_book[i].coverPhoto = "assets/images/notfound.jpg";
                    }
                  }
                    console.log(this.advertisements)
                  //advertisements
                  // this.advertisements = data.advertisements
                  // for(let i=0;i <this.advertisements.length; i++){
                  //   if(this.advertisements[i].name != ""){
                  //     let coverPhoto =this.ics.apiRoute + this.advertisements[i].name;
                  //     coverPhoto.replace("\/","/");
                  //     this.advertisements[i].name =  coverPhoto;
                  //   }else{
                  //     this.advertisements[i].name = "assets/images/notfound.jpg";
                  //   }
                  // }
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
  goPopularBook(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  goLatestBooks(){
    this.router.navigate(['/book-list','new','latestBooks']); 
    this.ics.bookList = this.latest_book_temp;
  }
  goLatestBook(value){
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

  add3Dots(string, limit)
  {
    var dots = ".....";
    if(string.length > limit)
    {
      string = string.substring(0,limit) + dots;
    }
      return string;
  }
  page = "1";
  author_id= "";
  bookList = [];
  goSearch() {
    const url = this.ics.apiRoute + '/search/book';
    for(let i=0; i< this.international_author.length;i++){
      if(this.international_author[i].name.includes(this.search)){
        this.author_id = this.international_author[i].boId;
      }
    }
    if(this.author_id == ""){
      for(let i=0; i< this.local_author.length;i++){
        if(this.local_author[i].name.includes(this.search)){
          this.author_id = this.local_author[i].boId;
        }
      }
    }
    
    const json =
    { "page": this.page,
      "user_id": this.ics._profile.userId,
      "category_id":"",
      "sub_category_id":"",
      "author_id": this.author_id,
      "start_date": this.startDate,
      "end_date": this.endDate,
      "searchTerms": this.search 
    }
    try {
      const header: HttpHeaders = new HttpHeaders({
        token: this.ics._profile.token
      });
      const url: string = this.ics.apiRoute + "/search/book";
      this.http.post(url, json, {
       headers: header
     }).subscribe(
        (data: any) => {
              if(data.status){
                if(data.books.length > 0){
                  this.router.navigate(['/book-list','new','bookList']); 
                  this.ics.books = data;
                }else{
                  
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
}
