import { Component, OnInit } from '@angular/core';
import { IntercomService } from '../framework/intercom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  changePasswordStatus = false;
  oldPassword: string = '';
  newPassword: string = '';
  loading = false;
  _result: string = '';
  success: string = '';

  constructor(
    private ics: IntercomService,
    private router: Router,
    private http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.user = this.ics.user;
    console.log("user profile: ", this.ics.user);
  }

  bookmark() {
    this.router.navigate(['/home1'])

  }

  changePasswordMenu() {
    this.changePasswordStatus = true;
  }

  changePassword() {
    console.log("here loading !")
    this.loading = true;
    if (this.newPassword == "" || this.oldPassword == "") {
      this._result = "Password must not empty!"
      return;
    }

    console.log("newPassword !!!!", this.newPassword)
    console.log("confirmPassword !!!!", this.oldPassword)

    const json = {
      old_password: this.ics.encrypt(this.oldPassword),
      new_password: this.ics.encrypt(this.newPassword),
    }

    const url: string = this.ics.apiRoute + "/user/goChangepwdByAdmin";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        console.log("data !!!!!!!:", data);
        if (data.status) {
          this.newPassword = "";
          this.oldPassword = "";
          this.success = data.message;

        }
        else
          this._result = data.message;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.warn("error !!!!!!!:", error);
      });
  }

  userInfo() {
    this.changePasswordStatus = false;
  }
  goBookList(value){
    this.router.navigate(['/book-list','read',value]); 
  }
}
