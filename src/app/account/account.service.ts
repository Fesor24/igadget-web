import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap, map, of, catchError, BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private userSource = new BehaviorSubject<IUser>({
    accessToken: "",
    idToken: "",
    username: "",
    isAuthenticated: false
  })

  user$ = this.userSource.asObservable();

  constructor(
    private oidcService: OidcSecurityService,
    private httpClient: HttpClient
  ) {}

  checkAuthStatus(): Observable<LoginResponse> {
    return this.oidcService.checkAuth().pipe(
      switchMap((response: LoginResponse) => {
        if (response.isAuthenticated) {
          let httpHeaders = new HttpHeaders();
          httpHeaders = httpHeaders.set(
            'Authorization',
            `Bearer ${response.accessToken}`
          );

          return this.httpClient
            .get('http://localhost:5000/connect/userinfo', {
              headers: httpHeaders,
            })
            .pipe(
              map((res) => {
                response.userData = res;
                this.userSource.next({
                  accessToken: response.accessToken,
                  idToken: response.idToken,
                  username: response.userData?.username,
                  isAuthenticated: true
                })
                return response;
              })
            );
        } else {
          return of(response); // Return original response if not authenticated
        }
      }),
      catchError((err) => {
        console.log(err);
        return of(err);
      })
    );
  }

  logout(){
    console.log("I was hit");
    this.oidcService.logoff().subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    });
  }

  login(){
    this.oidcService.authorize('main-config');
  }
}
