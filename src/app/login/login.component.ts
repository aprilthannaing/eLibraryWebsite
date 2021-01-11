import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IntercomService } from '../framework/intercom.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  loading = false;
  _result: string = "";

  constructor(
    private http: HttpClient,
    private ics: IntercomService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
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

    const url: string = this.ics.apiRoute + "/user/goLoginByAdmin";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json).subscribe(
      (data: any) => {
        if (data.status) {
          this.ics._profile.token = data.token
          this.router.navigate(['/home1']);

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

  loginDialog(title) {
    const dialogRef = this.dialog.open(LoginDialog, {
      data: {
        "title": title,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  verifyEmail() {
    const url = this.ics.apiRoute + '/user/verifyEmail';
    let json = { "email": this.email }

    this.http.post(url, json).subscribe(
      (data: any) => {
        console.log("data !!!!!!!!!", data)
        this.ics._profile.token = data.token;
        this.router.navigate(['forgetpassword'])
        this.loading = false;
      },
      error => {
        this.loading = false;
      });
  }

  forgetPassword() {
    this.loading = true;
    console.log("forget password")
    console.log("email !!!!!", this.email)
    if (this.email == "") {
      this._result = "Please enter your email address!";
      this.loading = false;
    }
    else {
      this.ics._profile.email = this.email;
      this.verifyEmail();
    }
  }
}



@Component({
  selector: 'login-dialog',
  templateUrl: './login-dialog.html',
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) { }

  route(): void {
    this.dialogRef.close();
  }
}
