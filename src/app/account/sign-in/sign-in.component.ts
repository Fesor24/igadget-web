import { Component, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  constructor(private oidcService: OidcSecurityService){}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus() {
    this.oidcService.checkAuth().subscribe({
      next: (response: LoginResponse) => console.log(response),
      error: (err) => console.log(err),
    });
  }
}
