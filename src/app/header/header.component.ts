import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    const header: HttpHeaders = new HttpHeaders({
      token: "7584491bd16084688c1c1f74498177d9"
    });
    const url = "http://192.168.3.56:8080/elibrary" + "/category/all";
    this.http.request('get',url, {
      headers: header
    }).subscribe(
      (data: any) => {
       this.categories = data.categories;
       console.log(this.categories)

      },
      error => {
        console.warn("error: ", error);
      });
  
  }
}
