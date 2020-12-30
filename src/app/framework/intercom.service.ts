import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercomService {
  _profile = {
    "userName": "",
    "logoText": "eLibrary",
    "logoLink": "/home",
    "menus": [],
    "rightMenus": [],
};
  private _rpbeanSource = new Subject<any>();
  rpbean$ = this._rpbeanSource.asObservable();
  constructor() { }
}
