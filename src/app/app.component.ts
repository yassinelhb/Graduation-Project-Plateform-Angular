import { Component } from '@angular/core';
import { AuthService } from './login/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'star-admin-angular';
  loggedIn: boolean=false;
  faCoffee = faCoffee;

  constructor(private authService:AuthService, private cookieService:CookieService, private router:Router){
    if (cookieService.check('token')){
      this.loggedIn=true;
    }
    else {
      this.router.navigate(['/login']);
    }
    this.authService.loggedIn.subscribe((val) => {
      this.loggedIn=val;
    });
  }
}
