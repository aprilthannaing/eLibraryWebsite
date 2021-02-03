import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-forgetpassword2',
  templateUrl: './forgetpassword2.component.html',
  styleUrls: ['./forgetpassword2.component.css']
})
export class Forgetpassword2Component implements OnInit {

  newpwd: string = '';
  confirmpwd: string = '';
  _result: string = '';
  loading = false;

  constructor(
    private http: HttpClient,
    private ics: IntercomService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.clear();
  }

  clear() {
    this.newpwd = "";
    this.confirmpwd = "";
  }

  reset() {

    if (this.newpwd != this.confirmpwd) {
      this._result = "Your new password and confirm password must be same!";
      this.clear();
      return;
    }

    this.loading = true;
    const url = this.ics.apiRoute + '/user/goResetPasswordByAdmin';
    let json = {
      "password": this.ics.encrypt(this.newpwd),
      "code": this.ics._profile.verifyCode,
      "email": this.ics._profile.email,
    }
    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        if (data.status){
          this.showMessage("You success,please login again!",true);
          this.router.navigate(['login'])
        }
        else this._result = data.message;
        this.loading = false;
      },
      error => {
        console.log("error: ", error)
        this.loading = false;
      });
  }
  searchKeyup(e: any) {
    if (e.which == 13) {
      this.reset();
    }
  }
  showMessage(msg, bool) {
    if (bool == true) { this.ics.sendBean({ "t1": "rp-alert", "t2": "success", "t3": msg }); }
    if (bool == false) { this.ics.sendBean({ "t1": "rp-alert", "t2": "warning", "t3": msg }); }
    if (bool == undefined) { this.ics.sendBean({ "t1": "rp-alert", "t2": "primary", "t3": msg }); }
  }
}





