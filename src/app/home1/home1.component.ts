import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {
  textMyan: any = ['သင်စာအုပ်ရှာဖွေနေပါသလား...?','လွှတ်တော်များဆိုင်ရာ စာကြည့်တိုက်',];
  textEng: any = ['Are you serarching a book..?','Parliamentary Library'];
  textData: any = [];
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
<<<<<<< HEAD
=======
  recommend_book:any;
  popular_book:any = [];
  popular_book_temp:any = [];
  latest_book_temp:any = [];
  latest_book:any = [];
  currentRate = 0;

>>>>>>> 3a33b037a34f5eb9d22d939a2cb04b3fa18cadd6
  slideAuthorsConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false,
  };
<<<<<<< HEAD
  constructor() { 
=======
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService
  ) { 
    this.goHome();
    this.changelanguage();
>>>>>>> 3a33b037a34f5eb9d22d939a2cb04b3fa18cadd6
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

<<<<<<< HEAD
=======
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
  changelanguage() {
    if (this.ics.language == 'eng') {
      for (let j = 0; j < this.textEng.length; j++) {
        this.textData[j] = this.textEng[j];
      }
    } else {
      for (let j = 0; j < this.textMyan.length; j++) {
        this.textData[j] = this.textMyan[j];
      }
    }
  }
>>>>>>> 3a33b037a34f5eb9d22d939a2cb04b3fa18cadd6
}
