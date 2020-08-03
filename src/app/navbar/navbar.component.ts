import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import {User} from '../Models/user';
import {LOCAL_STORAGE, WebStorageService} from 'ngx-webstorage-service';
import { isDefined } from '@angular/compiler/src/util';
import { AuthService } from '../login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {SoutenanceServiceService} from "../soutenance-component/soutenance-service.service";
import {Notification} from "../Models/notification";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit,OnDestroy {
  user: User;
  public sidebarOpened = false;
  notification: Notification[];
  nombre: Notification[];
  image:any=null;
  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }
  constructor(private sanitizer:DomSanitizer,config: NgbDropdownConfig, @Inject(LOCAL_STORAGE) private storage: WebStorageService, private authService:AuthService, private cookieService:CookieService, private router:Router , private httpService: SoutenanceServiceService ) {
    config.placement = 'bottom-right';
    this.authService.user.subscribe((val) => {
      this.user=val;
    });
    this.authService.image.subscribe((image) => {
      console.log(image.size);
      this.createImageFromBlob(image);
    })
    this.authService.getImage().subscribe((success)=>{
      console.log(success);
      this.createImageFromBlob(success);
    })
    this.start();
    this.user = this.storage.get('user');

    this.httpService.getNotificationUser(this.user.id).subscribe(
      data => {
        this.notification = data;
        console.log(this.notification);
      }
    );
    this.httpService.getNombreNotification(this.user.id).subscribe(
      data => {
        this.nombre = data;
        console.log(this.nombre);
      }
    );
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.image = reader.result.toString();
      console.log(image.size)
    }, false);
  if (image && image.size!==28) {
      reader.readAsDataURL(image);
    }
  }
  show(){
    return this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngOnInit() {
      this.user = this.storage.get('user');
      console.log(this.user);
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private storageEventListener(event: StorageEvent) {
    console.log(event);
    if (event.storageArea == localStorage) {
      let v;
      try { v = JSON.parse(event.newValue); }
      catch (e) { v = event.newValue; }
      console.log(event)
    }
  }

  private start(): void {
    window.addEventListener("storage", this.storageEventListener.bind(this));
  }

  private stop(): void {
    window.removeEventListener("storage", this.storageEventListener.bind(this));
  }

  logout() {
    this.cookieService.delete('token');
    this.authService.broadcastLoggedInChange(false);
    this.router.navigate(['/login']);
  }

}
