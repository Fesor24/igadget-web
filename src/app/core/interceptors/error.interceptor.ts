import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if(err){
          if(err.status === 404){
            this.router.navigate(["/"]);
            // toast the message
            let error = err.error?.message ? err.error?.message : "An error occurred";
            this.toastr.error(error, "Not Found");
          }
             if (err.status === 400) {
              console.log("err",err);
               this.router.navigate(['/']);
               let error = err.error?.message
                 ? err.error?.message
                 : 'An error occurred';
               this.toastr.error(error, 'Bad Request');
             }
        }

        const error = new Error(err.error);
        return throwError(() => error);
      })
    );
  }
}
