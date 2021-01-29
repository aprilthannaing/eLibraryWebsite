import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  search = "";
  startDate = "";
  endDate = "";
  categoryId:any;
  latest_book_temp:any = [];
  latest_book:any = [];
  books: any = [];
  booksTemp: any = [];
  sub_category:any = [];
  local_author = [
    {Id: 0,boId: "",name: "",sort: "",profilePicture: "",authorType: ""}
  ];
  international_author = [
    {Id: 0,boId: "",name: "",sort: "",profilePicture: "",authorType: ""}
  ];
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
  backgoundImg = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService) {
      this.route.params.subscribe(params => {
        let cmd = params['cmd'];
        if (cmd != null && cmd != "" && cmd == "read"){
          let id = params['id'];
          this.categoryId = id;
         if(this.categoryId == "CATEGORY10001"){
            this.backgoundImg = '/assets/images/categories/library.jpg';
          }else  if(this.categoryId == "CATEGORY10002"){
            this.backgoundImg = '/assets/images/categories/category4.jpg';
          }else  if(this.categoryId == "CATEGORY10003"){
            this.backgoundImg = '/assets/images/categories/category6.jpg';
          }else  if(this.categoryId == "CATEGORY10004"){
            this.backgoundImg = '/assets/images/categories/category10.jpg';
          }else  if(this.categoryId == "CATEGORY10005"){
            this.backgoundImg = '/assets/images/categories/category11.jpg';
          }else  if(this.categoryId == "CATEGORY10006"){
            this.backgoundImg = '/assets/images/categories/category3.jpg';
          }
          this.showBook();
        } 
     });
    }
    keydownSub: Subscription;
    ngOnDestroy() {
      this.keydownSub && this.keydownSub.unsubscribe();
    }
  
    ngOnInit() {
  
    }
    showBook(){
     
      const json = {
       "categoryId": this.categoryId,
       "user_id": this.ics._profile.userId,
       }
       const header: HttpHeaders = new HttpHeaders({
         token: this.ics._profile.token
       });
       const url: string = this.ics.apiRoute + "/home/book";
       this.http.post(url, json, {
        headers: header
      }).subscribe(
         (data: any) => {
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
             //latest_book Book 
             this.latest_book = data.latest_book
             for(let i=0; i < this.latest_book.length; i++){
               if(this.latest_book[i].coverPhoto != ""){
                 let coverPhoto =this.ics.apiRoute1 + this.latest_book[i].coverPhoto;
                 coverPhoto.replace("\/","/");
                 this.latest_book[i].coverPhoto =  coverPhoto;
               }else{
                 this.latest_book[i].coverPhoto = "assets/images/notfound.jpg";
               }
               this.latest_book[i].title = this.add3Dots(this.latest_book[i].title,50 );
             }
              //Sub Category
            this.sub_category = data.sub_category;
            this.showBookByCategory(this.sub_category[0].boId);
          }
         },
         error => {
           console.warn("error: ", error);
         });
     }
     showBookByCategory(data){
       //this.books = [];
      const json = {
        "page" : "1",
        "title":"",
        "sub_category_id": data,
        "category_id": this.categoryId,
        "author_id":"",
        "user_id": this.ics._profile.userId
        }
       const header: HttpHeaders = new HttpHeaders({
         token: this.ics._profile.token
       });
       const url: string = this.ics.apiRoute + "/book";
       this.http.post(url, json, {
        headers: header
      }).subscribe(
         (data: any) => {
           if(data.status){
             //book by category
             this.booksTemp = data.books
             let j = 8;
             if(this.booksTemp.length < j)
                j = this.booksTemp.length;
             for(let i=0; i < j; i++){
              this.books[i] =  this.booksTemp[i]
               if(this.books[i].coverPhoto != ""){
                 let coverPhoto =this.ics.apiRoute1 + this.books[i].coverPhoto;
                 coverPhoto.replace("\/","/");
                 this.books[i].coverPhoto =  coverPhoto;
               }else{
                 this.books[i].coverPhoto = "assets/images/notfound.jpg";
               }
               this.books[i].title = this.add3Dots(this.books[i].title,50 );
             }
          }
         },
         error => {
           console.warn("error: ", error);
         });
     }
  goLatestBook(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  goLatestBooks(){
    this.router.navigate(['/book-list','new','latestBooks']); 
    this.ics.bookList = this.books;
  }
  goBook(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
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
  add3Dots(string, limit)
    {
      var dots = ".....";
      if(string.length > limit)
      {
        string = string.substring(0,limit) + dots;
      }
        return string;
    }
    goBookByAuthors(value){
      this.router.navigate(['/book-list','read',value.boId]); 
      this.ics.titleLink = "Author/" + value.name
    }

    goBookByCategory(value){
      this.router.navigate(['/book-list','read',this.categoryId,value.boId]); 
      this.ics.titleLink = "Category/" + value.myanmarName
    }
    page = "1";
    author_id= "";
    bookList = [];
    goSearch() {
      const url = this.ics.apiRoute + '/search/book';
      for(let i=0; i< this.international_author.length;i++){
        if(this.international_author[i].name == this.search){
          this.author_id = this.international_author[i].boId;
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
                  this.router.navigate(['/book-list','new','bookList']); 
                  this.ics.books = data;
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
