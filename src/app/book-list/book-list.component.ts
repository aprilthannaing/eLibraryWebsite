import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  bookCount = 0;
  bookList = [];
  defaultImage = "assets/images/image_not_found.PNG";
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.showBookCount();
  }

  showBookCount(){
     
    const json = {
     "categoryId": "CATEGORY10002",
     "user_id": "USR2",
     "author_id": "Author10001"
     }
     const header: HttpHeaders = new HttpHeaders({
       token: "7584491bd16084688c1c1f74498177d9"
     });
     const url: string = "http://192.168.3.56:8080/elibrary" + "/home/book";
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
