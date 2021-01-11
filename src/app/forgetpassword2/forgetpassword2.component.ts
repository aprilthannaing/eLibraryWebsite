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
  }

  clear() {
    this.newpwd = "";
    this.confirmpwd = "";
  }

  reset() {

    if (this.newpwd != this.confirmpwd) {
      this._result = "Your new password and confirm password must be same!";
      this.clear();
    }

    this.loading = true;
    const url = this.ics.apiRoute + '/user/goResetPasswordByAdmin';
    let json = {
      "password": this.ics.encrypt(this.newpwd),
      "code": this.ics._profile.verifyCode,
      "email": this.ics._profile.email,
    }

    console.log("json : ", json);
    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        console.log("data: ", data)
        if (data.status)
          this.router.navigate(['login'])
        else this._result = data.message;
        this.loading = false;
      },
      error => {
        console.log("error: ", error)
        this.loading = false;
      });
  }
}





