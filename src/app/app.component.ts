import { Component, Input, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from './framework/intercom.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
declare var jQuery: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 @Input() currentlySelected: boolean;
  showmenu: boolean = true;
  selectedRow;
  header1 = false;
  header2 = true;
  login1 = true;
  categories: any = [];
  browserLang: any;
  email: string = "";
  password: string = "";
  loading = false;
  _result: string = "";
  replyCount = "10";
  lang = "";
  home1 = false;
mySubscription;
_alertflag = true;
  _alertmsg = "";
  constructor(
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private ics: IntercomService,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
         if(event.url == "/forgetpassword" || event.url == '/forgetpassword2'){
            //this.router.navigate(['/forgetpassword']);
            if(this.ics._profile.token== "")
              this.router.navigate(['/login']);
          }else if(event.url == "/login" && this.home1 != true){
          }else{
            if(this.ics._profile.token== ""){
              this.router.navigate(['/login']);
             }else if(!this.header1 || this.home1 == true){
              this.goCategory();
              this.getNotiCount();
              this.header1 = true;
              this.home1 = false;
              this.router.navigate(['/home1']);
             }
          }
      }
      ics.rpbean$.subscribe(x => {
        if (x.t1 !== null && x.t1 == "rp-popup") {
          jQuery("#rootpopupsize").attr('class', 'modal-dialog modal-lg');
          jQuery("#rootpopuptitle").text(x.t2);
          jQuery("#rootpopupbody").load(x.t3);
          jQuery("#rootpopup").modal();
        } else if (x.t1 !== null && x.t1 == "rp-wait") {
          jQuery("#rootpopupsize").attr('class', 'modal-dialog modal-sm');
          jQuery("#rootpopuptitle").text("Please Wait");
          jQuery("#rootpopupbody").text(x.t2);
          jQuery("#rootpopup").modal();
        } else if (x.t1 !== null && x.t1 == "rp-error") {
          jQuery("#rootpopupsize").attr('class', 'modal-dialog modal-sm');
          jQuery("#rootpopuptitle").text("System Exception");
          jQuery("#rootpopupbody").text(x.t2);
          jQuery("#rootpopup").modal();
        } else if (x.t1 !== null && x.t1 == "rp-msg") {
          jQuery("#rootpopupsize").attr('class', 'modal-dialog modal-sm');
          jQuery("#rootpopuptitle").text(x.t2);
          jQuery("#rootpopupbody").text(x.t3);
          jQuery("#rootpopup").modal();
        } else if (x.t1 !== null && x.t1 == "rp-msg-off") {
          jQuery("#rootpopuptitle").text("");
          jQuery("#rootpopupbody").text("");
          jQuery("#rootpopup").modal('hide');
        }
        else if (x.t1 !== null && x.t1 == "rp-alert") {
          this._alertmsg = x.t3;
          this._alertflag = false;
          let _snack_style = 'msg-info';
          if (x.t2 == "success") _snack_style = 'msg-success';
          else if (x.t2 == "warning") _snack_style = 'msg-warning';
          else if (x.t2 == "danger") _snack_style = 'msg-danger';
          else if (x.t2 == "information") _snack_style = 'msg-info';
          document.getElementById("snackbar").innerHTML = this._alertmsg;
          let snackbar = document.getElementById("snackbar");
          snackbar.className = "show " + _snack_style;
          setTimeout(function () { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
        }
      });
    }); 
    translate.addLangs(['myan', 'en']);
    translate.setDefaultLang('myan');
    //this.browserLang = translate.getBrowserLang();
    //translate.use(this.browserLang.match(/en|myan/) ? this.browserLang : 'en');

  }
ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }
  ngOnInit(): void {   
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
  if (this.router.url == '/home1') {
        this.home1 = true;
        this.selectedRow = this.categories.length+1;
        this.openConfirmationDialog();
    }else if (this.router.url.includes('category-list')) {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          // Could add more chars url:path?=;other possible
          const urlDelimitators = new RegExp(/[?//,;&:#$+=]/);
          let currentUrlPath = event.url.slice(1).split(urlDelimitators)[2];
          if(currentUrlPath != undefined){
            for(let i = 0;i<this.categories.length;i++){
              if(this.categories[i].boId == currentUrlPath){
                //this.goBookbyCategory(this.categories[i],i)
                this.selectedRow = i;
              }
            }
          }else this.selectedRow = this.categories.length +1;
          
          
        }
      });
    }
  }
  
  feedback(){
    this.router.navigate(["feedback"]);
    this.replyCount = "";   
  }

  getNotiCount() {
    const json = {
      user_id: this.ics._profile.userId,
    }

    const url: string = this.ics.apiRoute + "/home/notiCount";
    this.http.post(url, json, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
      (data: any) => {
        this.replyCount = data.notiCount;
      },
      error => {
        console.warn("error !!!!!!!:", error);
      });
  }

  verifyEmail() {

    this.header1 = false;
    this.header2 = false;
    this.login1 = false;
    const url = this.ics.apiRoute + '/user/verifyEmail';
    let json = { "email": this.email }

    this.http.post(url, json).subscribe(
      (data: any) => {
       this.router.navigate(['forgetpassword'])
        this.ics._profile.token = data.token;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
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

  goValidation() {
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

  login() {

    this.loading = true;
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
          this.login1 = false;
          this.header2 = false;
          this.header1 = true;
          this.router.navigate(['/home1']);
          this.getNotiCount();
          this.ics.getHomeData();

        } else {
          this._result = data.message;
          //this.loginDialog(data.message);
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.warn("error !!!!!!!:", error);
      });
  }

  goCategory() {
    const url = this.ics.apiRoute + '/category/all';
    try {
      this.http.get(url, { headers: new HttpHeaders().set('token', this.ics._profile.token) }).subscribe(
        (data: any) => {
          if (data.status) {
            this.categories = data.categories
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
  goBookbyCategory(value,index) {
    this.selectedRow = index;
    this.router.navigate(['/category-list', 'read', value.boId]);
    this.ics.titleLink = value.engName;
  }
  goHome(){
    this.selectedRow = this.categories.length+1;
    this.router.navigate(['/home1']);
  }
  openConfirmationDialog() {
    this.confirmationDialogService.confirm('Please confirm', 'Do you really want to Logout ?')
    .then((confirmed) => {
      if(confirmed){
        this.logout();
      }else{

      } 
    }).catch(() => 
      console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
  logout(){
    let url = this.ics.apiRoute + '/user/signout'
    let json = {"userid": this.ics._profile.userId}
      this.http.post(url,json,{headers: new HttpHeaders().set('token', this.ics._profile.token)}).subscribe(
        data  => {
          this.header1 = false;
          this.router.navigate(['/login']);
          this.header1 = false;
          this.ics._profile.userId = "";
          this.ics._profile.email = "";
          this.ics._profile.token = "";
          this.selectedRow = this.categories.length+1;
        },
        error => {}, () => { });
  }
}
