import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  email = "";
  password = "";
  _result = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    public translate: TranslateService
  ) {
    
  }

  ngOnInit(): void {
  }
  
  login() {

    this.loading = true;
    this.goValidation();
    if(this._result == ""){
      const json = {
        email: this.email,
        password: this.ics.encrypt(this.password),
      }
  
      const url: string = this.ics.apiRoute + "/user/goLoginByWebsite";
      this.http.post(url, json).subscribe(
        (data: any) => {
          if (data.status) {
            this.ics.user = data.data;
            this.ics._profile.token = data.token;
            this.ics._profile.userId = data.data.id;
            this.router.navigate(['/home1']);
            this.getNotiCount();
            //this.ics.getHomeData();
  
          } else {
            this._result = data.message;
            //this.loginDialog(data.message);
          }
          this.loading = false;
  
        },
        error => {
          this.loading = false;
          console.warn("error !!!!!!!:", error);
          if (error.name == "HttpErrorResponse") {
            alert("Connection Timed Out!");
          }
        });
    }else this.loading = false;
  }
  getNotiCount() {
    const json = {
      user_id: this.ics._profile.userId,
    }

    const url: string = this.ics.apiRoute + "/home/notiCount";
    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        this.ics._profile.replyCount = data.notiCount;
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }
  goValidation() {
    this._result = "";
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
  forgetPassword() {
    this.loading = true;
    if (this.email == "") {
      this._result = "Please enter your email address!";
      this.loading = false;
    }
    else {
      this.ics._profile.email = this.email;
      this.verifyEmail();
    }
  }
  verifyEmail() {
    const url = this.ics.apiRoute + '/user/verifyEmail';
    let json = { "email": this.email }

    this.http.post(url, json).subscribe(
      (data: any) => {
        if (data != null && data != undefined) {
          if (!data.status)
            this._result = data.message;
          else {
            this.router.navigate(['forgetpassword'])
            this.ics._profile.token = data.token;
            this.showMessage(data.message, true);
          }
        }
          this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }
  searchKeyup(e: any) {
    if (e.which == 13) {
      this.login();
    }
  }
  showMessage(msg, bool) {
    if (bool == true) { this.ics.sendBean({ "t1": "rp-alert", "t2": "success", "t3": msg }); }
    if (bool == false) { this.ics.sendBean({ "t1": "rp-alert", "t2": "warning", "t3": msg }); }
    if (bool == undefined) { this.ics.sendBean({ "t1": "rp-alert", "t2": "primary", "t3": msg }); }
  }
}
