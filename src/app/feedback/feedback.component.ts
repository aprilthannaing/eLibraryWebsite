import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  loading = false;
  message: string = '';
  _result: string = '';
  _error: string = '';
  feedbacks = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getReplyNoti();
    //this.viewAll();
  }

  feedback() {
    this.loading = true;
    const json = {
      user_id: this.ics._profile.userId,
      message: this.message,
    }

    const url: string = this.ics.apiRoute + "/operation/feedback";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        console.log("data", data)
        if (data.status) {
          this._result = data.message;
          this._error = "";
        }
        else {
          this._error = data.message;
          this._result = "";
        }
        this.loading = false;
        this.message = "";
      },
      error => {
        this.loading = false;
        console.warn("error !!!!!!!:", error);
      });

  }

  getReplyNoti() {
    const json = {
      user_id: this.ics._profile.userId,
    }

    const url: string = this.ics.apiRoute + "/operation/replyNoti";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        this.feedbacks = data.feedbacks;
        console.log("reply noti: ", data.feedbacks)
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }

  viewAll() {
    const json = {
      user_id: this.ics._profile.userId,
    }

    const url: string = this.ics.apiRoute + "/operation/viewall";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        console.log("data: ", data)
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }
}



