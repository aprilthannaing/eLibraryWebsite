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
  loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed iaculis enim risus, quis laoreet ligula ultricies sed. Integer porta leo ut enim rhoncus, a interdum leo tristique. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra nulla eu eros posuere tempor. Phasellus tincidunt elementum dolor ac fermentum. Donec scelerisque sapien nec porta pharetra. Nullam ut mollis risus. In finibus quam pulvinar diam pellentesque, at condimentum tellus vestibulum. Aliquam vel vestibulum elit, mollis porta eros. Maecenas nec lorem ultricies orci elementum lobortis. Etiam vitae commodo orci. Sed a aliquam tortor. Nulla ultrices imperdiet dolor, nec accumsan ipsum dignissim a. Morbi interdum ex vitae ipsum sagittis scelerisque. Nunc varius lorem quis sem gravida, tempus auctor lacus elementum. Suspendisse pulvinar lacus nisi, nec aliquam massa malesuada sit amet. Etiam non risus at nisi feugiat facilisis. Ut eget egestas metus. In hac habitasse platea dictumst.';
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
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "dots": true,
    "infinite": false,
    "nextArrow": false,
    "prevArrow": false,
  };
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": false,
    "infinite": false
  };
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
       "user_id": "USR2",
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
             //latest_book Book 
             this.latest_book = data.latest_book
             for(let i=0; i < this.latest_book.length; i++){
               if(this.latest_book[i].coverPhoto != ""){
                 let coverPhoto ="assets/elibrary" + this.latest_book[i].coverPhoto;
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
        "user_id":"USR1"
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
                 let coverPhoto ="assets/elibrary" + this.books[i].coverPhoto;
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

  goLatestBooks(){
    this.router.navigate(['/book-list','new','latestBooks']); 
    this.ics.bookList = this.latest_book_temp;
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
}
