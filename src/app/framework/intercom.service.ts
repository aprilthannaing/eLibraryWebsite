import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  _profile = {
    "email": "",
    "userName": "",
    "logoText": "eLibrary",
    "logoLink": "/home",
    "menus": [],
    "rightMenus": [],
    "token": "",
    "verifyCode" : "",
  };

  iv = 'AODVNUASDNVVAOVF';
  key = 'mykey@91mykey@91';
  apiRoute: string = "http://localhost:8082";
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

  constructor() { }
}
