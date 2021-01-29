import { Component, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from './framework/intercom.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 @Input() currentlySelected: boolean;
  showmenu: boolean = true;
  selectedRow;
  header1 = false;
  header2 = true;
  login1 = true;
  categories: any = [];
  browserLang: any;
  email: string = "";
  password: string = "";
  loading = false;
  _result: string = "";
  replyCount = "10";
  lang = "";
mySubscription;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    public translate: TranslateService
  ) {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(this.ics._profile.token== "")
          this.router.navigate(['']);
          this.goCategory();
      }
    }); 
    translate.addLangs(['myan', 'en']);
    translate.setDefaultLang('myan');
    //this.browserLang = translate.getBrowserLang();
    //translate.use(this.browserLang.match(/en|myan/) ? this.browserLang : 'en');

  }
ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {   
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if (this.router.url == '/home1') {
      let url = this.ics.apiRoute + '/user/signout'
      let json = {"userid": this.ics._profile.userId}
        this.http.post(url,json,{headers: new HttpHeaders().set('token', this.ics._profile.token)}).subscribe(
          data  => {
            this.header1 = false;
            console.log("Logging Out!!!!!!!!!!!!!!!!!!!!!");
          },
          error => {}, () => { });
    }
  }
  
  feedback(){
    this.router.navigate(["feedback"]);
    this.replyCount = "";   
  }

  getNotiCount() {
    const json = {
      user_id: this.ics._profile.userId,
    }

    const url: string = this.ics.apiRoute + "/home/notiCount";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        this.replyCount = data.notiCount;
        console.log("noti count: ", data)
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }

  verifyEmail() {

    this.header1 = false;
    this.header2 = false;
    this.login1 = false;
    const url = this.ics.apiRoute + '/user/verifyEmail';
    let json = { "email": this.email }

    this.http.post(url, json).subscribe(
      (data: any) => {
       // console.log("data !!!!!!!!!", data)
       this.router.navigate(['forgetpassword'])
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
          console.log("user : ", data)
          this.ics.user = data.data;
          this.ics._profile.token = data.token;
          this.ics._profile.userId = data.data.id;
          this.login1 = false;
          this.header2 = false;
          this.header1 = true;
          this.router.navigate(['/home1']);
          this.getNotiCount();
          this.ics.getHomeData();

        } else {
          this._result = data.message;
          //this.loginDialog(data.message);
        }
        this.loading = false;

        console.log("profile: ", this.ics._profile)


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
  goBookbyCategory(value,index) {
    this.selectedRow = index;
    this.router.navigate(['/category-list', 'read', value.boId]);
    this.ics.titleLink = value.engName;
  }
  goHome(){
    this.selectedRow = this.categories.length+1;
    this.router.navigate(['/home1']);
  }
  logout(){
    this.router.navigate(['/login']);
    this.header1 = false;
    this.header2 = true;
    this.login1 = true;
    this.ics._profile.userId = "";
    this.ics._profile.email = "";
    this.ics._profile.token = "";
    // this.ics._profile = {
    //   "userId": "",
    //   "email": "",
    //   "phno":"",
    //   "type":"",
    //   "hluttaw":"",
    //   "department":"",
    //   "position":"",
    //   "userName": "",
    //   "logoText": "eLibrary",
    //   "logoLink": "/home",
    //   "menus": [],
    //   "rightMenus": [],
    //   "verifyCode": "",
    //   "token": "",
    // };
  }
}
