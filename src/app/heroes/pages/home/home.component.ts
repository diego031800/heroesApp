import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `.container {
      margin: 20px;
    }`
  ]
})
export class HomeComponent {

  get auth(): Auth {
    return this.auth_s.auth;
  }

  constructor(
    private router: Router,
    private auth_s: AuthService
  ) {}

  logout() {
    this.router.navigate(['./auth'])
  }
}
