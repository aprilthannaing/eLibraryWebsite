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
  categories: any = [];
  browserLang: any;
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
  }

  goCategory() {
    const url = this.ics.apiRoute + '/category/all';
    try {
      this.http.get(url, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
        (data: any) => {
          if (data.status) {
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

  goBookbyCategory(value) {
    this.router.navigate(['/category-list', 'read', value.boId]);
    this.ics.titleLink = value.engName;
  }
}