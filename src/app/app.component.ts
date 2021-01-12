import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from './framework/intercom.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showmenu: boolean = true;
  header1 = false;
  header2 = true;
  login1 = true;
  categories: any = [];
  browserLang: any;
  email: string = "";
  password: string = "";
  loading = false;
  _result: string = "";

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
    console.log("header 1  !!!", this.header1)
    console.log("header 2 !!!", this.header2)
    console.log("login 1  !!!", this.login1)
  }

  verifyEmail() {
    this.router.navigate(['forgetpassword'])

    this.header1 = false;
    this.header2 = false;
    this.login1 = false;
    const url = this.ics.apiRoute + '/user/verifyEmail';
    let json = { "email": this.email }

    this.http.post(url, json).subscribe(
      (data: any) => {
        console.log("data !!!!!!!!!", data)
        this.ics._profile.token = data.token;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }

  forgetPassword() {
    this.loading = true;
    console.log("forget password")
    console.log("email !!!!!", this.email)
    if (this.email == "") {
      this._result = "Please enter your email address!";
      this.loading = false;
    }
    else {
      this.ics._profile.email = this.email;
      this.verifyEmail();
    }
  }

  goValidation() {
    if (this.password === "" && this.email === "") {
      return this._result = "Please enter your email address and password";
    }
    if (this.email === "") {
      return this._result = "Please enter your email address";
    }
    if (!(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.email)) {
      return this._result = "Your email address is incorrect";
    }

    if (this.password === "") {
      return this._result = "Please enter your password";
    }
  }

  login() {

    this.loading = true;
    const json = {
      email: this.email,
      password: this.ics.encrypt(this.password),
    }

    const url: string = this.ics.apiRoute + "/user/goLoginByAdmin";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json).subscribe(
      (data: any) => {
        if (data.status) {
          this.ics._profile.token = data.token
          this.login1 = false;
          this.header2 = false;
          this.header1 = true;
          this.router.navigate(['/home1']);

        } else {
          this._result = data.message;
          //this.loginDialog(data.message);
        }
        this.loading = false;

      },
      error => {
        this.loading = false;
        console.warn("error !!!!!!!:", error);
      });
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
