import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  verifyCode: string = '';
  _result: string = "";
  loading = false;

  constructor(
    private http: HttpClient,
    private ics: IntercomService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  verify() {
    this.loading = true;

    if (this.verifyCode === "")
      this._result = "Please enter the verification code that will be sent to your email!";

    this.loading = true;
    const url = this.ics.apiRoute + '/user/verifyCode';
    const json = { "code": this.verifyCode, "email": this.ics._profile.email }

    this.http.post(url, json,
      { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
        (data: any) => {
          if (data.status) {
            this.ics._profile.verifyCode = this.verifyCode;
            this.router.navigate(['/forgetpassword2'])
            this.showMessage(data.message,true);
          } else {
            this._result = data.message;
          }
          this.loading = false;
        },
        error => {
          console.log("error: ", error);
          this.loading = false;
        });

  }
  searchKeyup(e: any) {
    if (e.which == 13) {
      this.verify();
    }
  }
  showMessage(msg, bool) {
    if (bool == true) { this.ics.sendBean({ "t1": "rp-alert", "t2": "success", "t3": msg }); }
    if (bool == false) { this.ics.sendBean({ "t1": "rp-alert", "t2": "warning", "t3": msg }); }
    if (bool == undefined) { this.ics.sendBean({ "t1": "rp-alert", "t2": "primary", "t3": msg }); }
  }
}
