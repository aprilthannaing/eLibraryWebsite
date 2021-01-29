import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  apiRoute: string = "http://136.228.165.174:8080/elibrary";
  apiRoute1: string = "http://136.228.165.174:8080";
  //apiRoute: string = "http://localhost:8082"
  //apiRoute1: string = "http://localhost:8082";
  appStoreLink = "";
  palyStoreLink = "";
  bookDetail: any;
  bookList: any;
  titleLink: any;
  books = [];
  language = "myan";
  recommendBooks = [];

  _profile = {
    "userId": "",
    "email": "",
    "phno":"",
    "type":"",
    "hluttaw":"",
    "department":"",
    "position":"",
    "userName": "",
    "logoText": "eLibrary",
    "logoLink": "/home",
    "menus": [],
    "rightMenus": [],
    "verifyCode": "",
    "token": "",
    "replyCount":"",
  };

  user: any;

  iv = 'AODVNUASDNVVAOVF';
  key = 'mykey@91mykey@91';
  private _rpbeanSource = new Subject<any>();
  rpbean$ = this._rpbeanSource.asObservable();
  private _mybean: any;
  sendBean(x: any) {
    this._mybean = x;
    this._rpbeanSource.next(x);
  }

  encrypt(stringToEncrypt) {
    var forge = require('node-forge');
    var plaintext = stringToEncrypt;
    var cipher = forge.cipher.createCipher('AES-CBC', this.key);
    cipher.start({ iv: this.iv });
    cipher.update(forge.util.createBuffer(plaintext));
    cipher.finish();
    var encrypted = cipher.output;
    var encodedB64 = forge.util.encode64(encrypted.data);
    return encodedB64;
  }

  constructor(
    private http: HttpClient,
  ) { }

  getHomeData() {
    const json = {
      user_id: this._profile.userId,
    }

    const url: string = this.apiRoute + "/home";
    console.log("request: ", json)
    console.log("url: ", url)

    this.http.post(url, json, { headers: new HttpHeaders().set('token', this._profile.token) }).subscribe(
      (data: any) => {
        this.recommendBooks = data.recommend_book;
       // console.log("data !!!!!!!:", this.recommendBooks);

      },
      error => {
        console.warn("error !!!!!!!:", error);

      });
  }
}
