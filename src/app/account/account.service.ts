import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, switchMap, map, of, catchError, BehaviorSubject, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private userSource = new ReplaySubject<IUser>(1)

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
          this.userSource.next({
            idToken: "",
            accessToken: "",
            isAuthenticated: false,
            username: ""
          })
          return of(response); // Return original response if not authenticated
        }
      }),
      catchError((err) => {
        this.userSource.next({
          idToken: "",
          accessToken: "",
          username: "",
          isAuthenticated: false
        })
        console.log(err);
        return of(err);
      })
    );
  }

  logout(){
    this.oidcService.logoff().subscribe({
      next: () => {
        this.userSource.next({
          idToken: "",
          accessToken: "",
          username: "",
          isAuthenticated: false
        })
      },
      error: err => console.log(err)
    });
  }

  login(){
    this.oidcService.authorize('main-config');
  }
}
