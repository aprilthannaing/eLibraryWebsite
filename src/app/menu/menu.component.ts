import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IntercomService } from '../framework/intercom.service';
import { Router } from '@angular/router';
import { Profile } from 'selenium-webdriver/firefox';
declare var pms: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  subscription: Subscription;
  _right = true;
  _signOut = "/login";
  _cmd = "";
  _profile = {
    "userName": "April",
    "logoText": "",
    "logoLink": "",
    "menus": [
      { "menuItem": "Menu01", "caption": "Menu 01" },
      { "menuItem": "Menu02", "caption": "Menu 02" },
      { "menuItem": "Menu03", "caption": "Menu 03" },
      {
        "menuItem": "Menu04", "caption": "Menu Group",
        "menuItems":
        [
          { "menuItem": "Menu01", "caption": "Menu 001" },
          { "menuItem": "Menu02", "caption": "Menu 002" },
          { "menuItem": "Menu03", "caption": "Menu 003" },
          { "menuItem": "Menu04", "caption": "Menu 004" },
          { "menuItem": "Menu05", "caption": "Menu 005" },
          { "menuItem": "Menu06", "caption": "Menu 006" },
          { "menuItem": "Menu07", "caption": "Menu 007" }
        ]
      }
    ],
    "rightMenus": [
        { "menuItem": "", "caption": "Menu 001"}
    ]
  };
  constructor(private ics: IntercomService, private _router: Router) {
    console.log("Profile>>", this._profile);
    //this._profile = ics._profile;
    //pms.showNotification('top', 'center', 'Welcome '+this._profile.userName, 'success');
    //this.subscription = ics.rpbean$.subscribe(x => { this._profile = ics._profile; });
  }
  cmd() {
    this._router.navigate(['/command', this._cmd]);
  }
}
