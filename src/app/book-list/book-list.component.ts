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

  bookCount = 0;
  bookList = [];
  defaultImage = "assets/images/image_not_found.PNG";
  sub: any;
  categoryId = "";
  authorId = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService    ) { }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
      let cmd = params['cmd'];
      if (cmd != null && cmd != "" && cmd == "read") {
       let id = params['id'];
       if(id.includes("CATEGORY"))
        this.categoryId = id;
       if(id.includes("author"))
        this.authorId = id;
      }
  });
    this.showBookCount();
  }

  showBookCount(){
     
    const json = {
     "categoryId": this.categoryId,
     "user_id": "USR2",
     "author_id": this.authorId
     }
     const header: HttpHeaders = new HttpHeaders({
       token: this.ics._profile.token
     });
     const url: string = this.ics.apiRoute + "/home/book";
     this.http.post(url, json, {
      headers: header
    }).subscribe(
       (data: any) => {
         console.warn("data: ", data);
         this.bookCount = data.book_count;
         this.bookList = data.latest_book;

       },
       error => {
         console.warn("error: ", error);
       });
   }

   

   changeSource(event) { event.target.src = "assets/images/image_not_found.PNG" }

}
