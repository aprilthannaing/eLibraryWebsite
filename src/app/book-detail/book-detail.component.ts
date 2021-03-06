import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
declare var require: any
const FileSaver = require('file-saver');
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
      for (let i = 0; i < 6; i++)
        this.recommendBooks.push(this.ics.recommendBooks[i]);
  }

  userAction(boId, actionStatus) {
    const json = {
      user_id: this.ics._profile.userId,
      book_id: boId,
      action_status: actionStatus,
      rating: "0"
    }

    const url: string = this.apiRoute + "/history/action";
    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }

  bookmark() {
    this.bookDetail.bookMarkStatus = true;
    this.userAction(this.bookDetail.boId, "bookmark");
  }


  favourite() {
    this.bookDetail.favouriteStatus = true;
    console.log(" favourite ")
    this.userAction(this.bookDetail.boId, "favourite");
  }

  ssbookmark(boId) {
    this.userAction(boId, "bookmark");

  }
  //PDF Viewer
  pdfView = 0;
  pdfSrc = "";
  downloadApproval = "";
  PDFtitle = 'angular-pdf-viewer-app';
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  pagePDF = 1;
  renderText = true;
  originalSize = false;
  fitToPage = false;
  showAll = false;
  autoresize = false;
  //showBorders = true;
  renderTextModes = [0, 1, 2];
  renderTextMode = 1;
  rotation = 0;
  zoom = 1.0;
  zoomScale = 'page-fit';
  zoomScales = ['page-width', 'page-fit', 'page-height'];
  pdfQuery = '';
  totalPages: number;
  stickToPage = true;
  pdf:any;
  incrementZoom(amount: number) {
    this.zoom += amount;
  }
  incrementPage(amount: number) {
    this.pagePDF += amount;
  }
  rotateDoc() {
    this.rotation += 90;
  }
   // Event for search operation
   searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true
      });
    }
  }
  rotate(angle: number) {
    this.rotation += angle;
  }
  callBackFn(event) {
    this.pdf = event;
    this.totalPages = event._pdfInfo.numPages
  }
  pageRendered(event) {
  }
  textLayerRendered(event) {
  }
  onError(event) {
    alert("No Data Avaliable");
    this.pdfView = 0;
    console.error('onError', event);
  }
  onProgress(event) {
  }
  goBookRead(){
    this.downloadApproval = this.bookDetail.downloadApproval;
    this.pdfView = 1;
    this.pdfSrc = this.ics.apiRoute1 + this.bookDetail.path;
    //this.pdfSrc = 'http://localhost:4200/assets/elibrary/WaterMarkFile/wartermark1.pdf'//'localhost:4200/assets/elibrary' + book.path;
  }
  // getUrl()
  // {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  // }
  downloadPdf() {
    if(this.downloadApproval == "true"){
      const pdfName = 'your_pdf_file';
      FileSaver.saveAs(this.pdfSrc, pdfName);
    }else
      alert("This file can't be download!")
  }
  goBack(){
    this.pdfView = 0;
  }
  toggleshowAll(event: MatSlideToggleChange) {
    this.showAll = event.checked;
  }
  togglefitToPage(event: MatSlideToggleChange) {
    this.fitToPage = event.checked;
  }
  toggleoriginalSize(event: MatSlideToggleChange) {
    this.originalSize = event.checked;
  }
  toggleautoresize(event: MatSlideToggleChange) {
    //work in page-height
    this.autoresize = event.checked;
  }
  togglerenderText(event: MatSlideToggleChange) {
    this.renderText = event.checked;
  }

}
