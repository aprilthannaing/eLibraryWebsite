import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories:any = [];
  browserLang : any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    public translate: TranslateService
  ) {
    this.goCategory();
    translate.addLangs(['en', 'myan']);
    translate.setDefaultLang('en');

     this.browserLang = translate.getBrowserLang();
    translate.use(this.browserLang.match(/en|myan/) ? this.browserLang : 'en');
   }

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

  goCategory() {
    const url = this.ics.apiRoute + '/category/all';
    try {
        this.http.get(url,{headers: new HttpHeaders().set('token', this.ics._profile.token)}).subscribe(
            (data:any) => {
              if(data.status){
                 this.categories = data.categories
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
  goBookbyCategory(value){
    this.router.navigate(['/book-list','read',value.boId]); 
    this.ics.titleLink = value.engName;
  }
}
