import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/auth.interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private auth_s: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth_s.login()
    .subscribe( (data: Auth) => {
      if (data.id) {
          this.router.navigate(['./heroes'])
        }
      });
  }
}
