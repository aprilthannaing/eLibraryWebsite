import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  apiRoute: string = "http://localhost:8082";
  bookDetail: any;
  bookList: any;
  titleLink: any;
  language= "eng";

  _profile = {
    "token": "7584491bd16084688c1c1f74498177d9",
    "userName": "",
    "logoText": "eLibrary",
    "logoLink": "/home",
    "menus": [],
    "rightMenus": []
};
  private _rpbeanSource = new Subject<any>();
  rpbean$ = this._rpbeanSource.asObservable();
  constructor() { }
}
