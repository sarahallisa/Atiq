import {Component, Input, Output} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'client';

  isMenuCollapsed = true;

  constructor(public authService: AuthService, private route: Router) {
  }

  logOut() {
    this.authService.logOut()
    this.isMenuCollapsed = true
    window.location.reload()
  }
}
