import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookDetail:any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService
  ) {
    this.bookDetail = this.ics.bookDetail;
   }

  ngOnInit(): void {
  }

}
