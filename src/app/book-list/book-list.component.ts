import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  page = "1";
  pageArray = [];
  title = "";
  last_page = 0;
  bookCount = 0;
  bookList = [];
  defaultImage = "assets/images/image_not_found.PNG";
  sub: any;
  categoryId = "";
  authorId = "";
  titleLink = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService    ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let cmd = params['cmd'];
      if (cmd != null && cmd != "" && cmd == "new") {
        let id = params['id'];
        this.titleLink = id;
        if(id == "popularBooks"){
          this.title = "Popular Book List";
        }
        else if(id == "latestBooks"){
          this.title = "Latest Book List";
        } 
        else if(id == "recommendBooks"){
          this.title = "Recommended Book List";
        }
        else if(id.includes("Author")){
          this.title = "Book by Author List";
        }
        this.bookList = this.ics.bookList;
        this.bookCount = this.bookList.length;
        for(let i=0;i <this.bookList.length; i++){
          if(this.bookList[i].coverPhoto != ""){
            if(!this.bookList[i].coverPhoto.includes("assets")){
              let coverPhoto ="assets/elibrary" + this.bookList[i].coverPhoto;
              coverPhoto.replace("\/","/");
              this.bookList[i].coverPhoto =  coverPhoto;
            }
          }else if(!this.bookList[i].coverPhoto.includes("assets"))
              this.bookList[i].coverPhoto = "assets/images/notfound.jpg";
         this.bookList[i].title = this.add3Dots(this.bookList[i].title,100 );
       }
      }
      else if (cmd != null && cmd != "" && cmd == "read") {
        let id = params['id'];
        if(id.includes("CATEGORY"))
          this.categoryId = id;
        if(id.includes("Author")){
          this.authorId = id;
          this.title = "Book by Author"
        }
         
        //For Title
          if(id == "CATEGORY10001")
          this.title = "Myanmar Book List";
          if(id == "CATEGORY10002")
          this.title = "Ministry Book List";
          if(id == "CATEGORY10003")
          this.title = "Organization Book List";
          if(id == "CATEGORY10004")
          this.title = "English Book List";
          if(id == "CATEGORY10005")
          this.title = "Periodicals Book List";
          if(id == "CATEGORY10006")
          this.title = "Information List";

          this.titleLink = this.ics.titleLink;
          this.showBook();
      }
  });
  }

  showBook(){
     
    const json = {
     "category_id": this.categoryId,
     "user_id": "USR2",
     "author_id": this.authorId,
     "page" : this.page,
     "title":"",
     "sub_category_id":"",
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
          console.warn("data: ", data);
          this.bookList = data.books;
          this.bookCount = data.total_count;
          this.last_page = + data.last_page;
          for (var i = 1; i <= this.last_page; i++) {
            this.pageArray.push(i);
         }
          for(let i=0;i <this.bookList.length; i++){
            if(this.bookList[i].coverPhoto != ""){
                let coverPhoto ="assets/elibrary" + this.bookList[i].coverPhoto;
                coverPhoto.replace("\/","/");
                this.bookList[i].coverPhoto =  coverPhoto;
            }else{
                this.bookList[i].coverPhoto = "assets/images/notfound.jpg";
            }
              this.bookList[i].title = this.add3Dots(this.bookList[i].title,100 );
          }
        }
       },
       error => {
         console.warn("error: ", error);
       });
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

   changeSource(event) { event.target.src = "assets/images/image_not_found.PNG" }

   goBookDetail(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }

  goBookDetails(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  changePage(){
    this.showBook();
  }
}
