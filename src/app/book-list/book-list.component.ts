import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IntercomService } from '../framework/intercom.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
declare var jQuery: any;
declare var require: any
const FileSaver = require('file-saver');
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  json: any;
  pdfSrc = "";
  pdfView = 0;
  page = "1";
  pageArray = [];
  title = "";
  bookTitle = "";
  last_page = 0;
  bookCount = 0;
  bookList = [];
  defaultImage = "assets/images/image_not_found.PNG";
  sub: any;
  categoryId = "";
  subCategoryId = "";
  authorId = "";
  titleLink = "";
  startDate = "";
  endDate ="";
  search = "";
  cmd = "";
  id = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    private sanitizer: DomSanitizer    ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      let cmd = params['cmd'];
      this.cmd = cmd;
      if (cmd != null && cmd != "" && cmd == "new") {
        this.id = params['id'];
        this.titleLink = this.id;
        this.bookListByNew(this.id);
      }
      else if (cmd != null && cmd != "" && cmd == "read") {
        this.id = params['id'];
        let id1 = "";
        if(params['id1']){
          id1 = params['id1'];
        }
        if(this.id.includes("CATEGORY"))
          this.categoryId = this.id;
        if(id1.includes("SUBCATEGORY"))
          this.subCategoryId = id1;
        if(this.id.includes("Author")){
          this.authorId = this.id;
          this.title = "Book by Author"
        }
         if(this.id.includes("favourite")){
          this.bookTitle = this.id;
          this.title = "Favourite List"
          this.titleLink = this.id;
         }
         if(this.id.includes("bookmark")){
          this.bookTitle = this.id;
          this.title = "Bookmark List"
          this.titleLink = this.id
         }
        //For Title
          if(this.id == "CATEGORY10001")
          this.title = "Myanmar Book List";
          if(this.id == "CATEGORY10002")
          this.title = "Ministry Book List";
          if(this.id == "CATEGORY10003")
          this.title = "Organization Book List";
          if(this.id == "CATEGORY10004")
          this.title = "English Book List";
          if(this.id == "CATEGORY10005")
          this.title = "Periodicals Book List";
          if(this.id == "CATEGORY10006")
          this.title = "Information List";

          this.titleLink = this.ics.titleLink;
          this.showBook();
      }
      else if (cmd != null && cmd != "" && cmd == "other") {
        this.json = params['id'];
          this.goSearch1();
      }
  });
  }
  bookListByNew(id){
    if(id == "bookList"){
      this.goSearchingByHomeAndCategory();
      //this.bookListing(this.ics.books);
    }else{
        if(id == "popularBooks"){
          this.title = "Popular Book List";
        }
        else if(id == "latestBooks"){
          this.title = "Latest Book List";
        } 
        else if(id == "recommendBooks"){
          this.title = "Recommended Book List";
        }
        else if(id.includes("Author")){
          this.title = "Book by Author List";
        }
        this.bookList = this.ics.bookList;
        this.bookCount = this.bookList.length;
        for(let i=0;i <this.bookList.length; i++){
          if(!this.bookList[i].coverPhoto.includes("http")){
            if(this.bookList[i].coverPhoto != ""){
              if(!this.bookList[i].coverPhoto.includes("assets")){
                let coverPhoto =this.ics.apiRoute1 + this.bookList[i].coverPhoto;
                coverPhoto.replace("\/","/");
                this.bookList[i].coverPhoto =  coverPhoto;
              }
            }else if(!this.bookList[i].coverPhoto.includes("assets"))
                  this.bookList[i].coverPhoto = "assets/images/notfound.jpg";
          }
        this.bookList[i].title = this.add3Dots(this.bookList[i].title,100 );
      }
    }
  }
  searchKeyup(e: any) {
    if (e.which == 13) {
      this.goSearching()
    }
  }
  goSearching(){
    this.page = "1";
    const json =
      { "page": this.page,
        "user_id": this.ics._profile.userId,
        "category_id": this.categoryId,
        "sub_category_id": "",
        "author_id": this.authorId,
        "start_date": this.startDate,
        "end_date": this.endDate,
        "searchTerms": this.search 
      }
    this.json = json;
    this.goSearch1();
  }
  goSearchingByHomeAndCategory(){
    this.json = this.ics.json;
    this.json.page = this.page;
    this.goSearch1();
  }

  goSearch1() {
    const url = this.ics.apiRoute + '/search/book';
    const json = this.json
    try {
      const header: HttpHeaders = new HttpHeaders({
        token: this.ics._profile.token
      });
      this.http.post(url, json, {
       headers: header
     }).subscribe(
        (data: any) => {
              if(data.status){
                if(data.books.length > 0){
                  this.bookListing(data);
                }
              }else{
                  if(this.cmd == "new"){
                    this.bookListByNew(this.id);
                  }else{
                    this.showBook();
                  }
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
  bookListing(data){
    if(data.status){
      this.bookList = data.books;
      this.bookCount = data.total_count;
      this.last_page = + data.last_page;
      for (var i = 1; i <= this.last_page; i++) {
        this.pageArray.push(i);
     }
      for(let i=0;i <this.bookList.length; i++){
        if(this.bookList[i].coverPhoto != ""){
            let coverPhoto =this.ics.apiRoute1 + this.bookList[i].coverPhoto;
            coverPhoto.replace("\/","/");
            this.bookList[i].coverPhoto =  coverPhoto;
        }else{
            this.bookList[i].coverPhoto = "assets/images/notfound.jpg";
        }
        if(this.bookList[i].path != ""){
          let pdfPath = this.ics.apiRoute1 + this.bookList[i].path;
          pdfPath.replace("\/","/");
          this.bookList[i].path = pdfPath;
        }else{
          this.bookList[i].path = "assets/images/notfound.jpg";
      }
          this.bookList[i].title = this.add3Dots(this.bookList[i].title,100 );
      }
    }
  }
  showBook(){
     
    const json = {
     "category_id": this.categoryId,
     "user_id": this.ics._profile.userId,
     "author_id": this.authorId,
     "page" : this.page,
     "title": this.bookTitle,
     "sub_category_id": this.subCategoryId,
     }
     const header: HttpHeaders = new HttpHeaders({
       token: this.ics._profile.token
     });
     const url: string = this.ics.apiRoute + "/book";
     this.http.post(url, json, {
      headers: header
    }).subscribe(
       (data: any) => {
         if(data.status){
          this.bookList = data.books;
          this.bookCount = data.total_count;
          this.last_page = + data.last_page;
          for (var i = 1; i <= this.last_page; i++) {
            this.pageArray.push(i);
         }
          for(let i=0;i <this.bookList.length; i++){
            if(this.bookList[i].coverPhoto != ""){
                let coverPhoto =this.ics.apiRoute1 + this.bookList[i].coverPhoto;
                coverPhoto.replace("\/","/");
                this.bookList[i].coverPhoto =  coverPhoto;
            }else{
                this.bookList[i].coverPhoto = "assets/images/notfound.jpg";
            }
            if(this.bookList[i].path != ""){
              let pdfPath = this.ics.apiRoute1 + this.bookList[i].path;
              pdfPath.replace("\/","/");
              this.bookList[i].path = pdfPath;
            }else{
              this.bookList[i].path = "assets/images/notfound.jpg";
          }
              this.bookList[i].title = this.add3Dots(this.bookList[i].title,100 );
          }
        }
       },
       error => {
         console.warn("error: ", error);
       });
   }

   add3Dots(string, limit)
    {
      var dots = ".....";
      if(string.length > limit)
      {
        string = string.substring(0,limit) + dots;
      }
        return string;
    }

   changeSource(event) { event.target.src = "assets/images/image_not_found.PNG" }

   goBookDetail(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }

  goBookDetails(value){
    this.router.navigate(['/book-detail']); 
    this.ics.bookDetail = value;
  }
  changePage(){
    if(this.id == "bookList")
        this.goSearchingByHomeAndCategory();
    else this.showBook();
  }
  //PDF Viewer
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
  goBookRead(book){
    this.downloadApproval = book.downloadApproval;
    this.pdfView = 1;
    this.pdfSrc = this.ics.apiRoute1 + book.path;
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