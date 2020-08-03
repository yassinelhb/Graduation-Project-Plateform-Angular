import { Component, OnInit, Inject } from '@angular/core';
import { items } from './sidebar_items';
import { AuthService } from '../login/auth.service';
import { User } from '../Models/user';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

import { Notification } from '../Models/notification';
import { SoutenanceServiceService } from '../soutenance-component/soutenance-service.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  items = items;
  user: User = null;

  css = false;
  notification: Notification[];
  notif: Notification[];

  constructor(private sanitizer:DomSanitizer,private authService: AuthService, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private httpService: SoutenanceServiceService) {
    this.authService.user.subscribe((val) => {
      this.user = val;
    });
    this.user = this.storage.get('user');

  }
  ngOnInit() {
    this.user = this.storage.get('user');
    this.httpService.getNotificationUser(this.user.id).subscribe(
      data => {
        this.notification = data;
        console.log(this.notification);
      }
    );
  }
}
