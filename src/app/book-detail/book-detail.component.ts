import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookDetail: any;
  recommendBooks = [];
  apiRoute: string = '';
  apiRoute1: string = '';
  constructor(
    private router: Router,
    private http: HttpClient,
    private ics: IntercomService,
    private actRoute: ActivatedRoute,
  ) {
    this.bookDetail = this.ics.bookDetail;
    this.apiRoute = this.ics.apiRoute;
    this.apiRoute1 = this.ics.apiRoute1;
  }

  ngOnInit(): void {
    if (this.ics.recommendBooks.length > 0)
      for (let i = 0; i < 5; i++)
        this.recommendBooks.push(this.ics.recommendBooks[i]);
    console.log(" this.bookDetail ", this.bookDetail)

  }

  userAction(boId, actionStatus) {
    const json = {
      user_id: this.ics._profile.userId,
      book_id: boId,
      action_status: actionStatus,
      rating: "0"
    }

    const url: string = this.apiRoute + "/history/action";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
      //  console.log("data !!!!!!!:", data);

      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }

  bookmark() {
    console.log(" book mark !!!!!!!!! ")
    this.bookDetail.bookMarkStatus = true;
    this.userAction(this.bookDetail.boId, "bookmark");
  }


  favourite() {
    this.bookDetail.favouriteStatus = true;
    console.log(" favourite ")
    this.userAction(this.bookDetail.boId, "favourite");
  }

  ssbookmark(boId) {
    console.log("boId: ", boId);
    this.userAction(boId, "bookmark");

  }

}
