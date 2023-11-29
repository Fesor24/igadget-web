import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../account/account.service';
import { of, switchMap } from 'rxjs';
import { IOrder } from '../shared/models/order.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getOrders(){
    return this.accountService.user$.pipe(
      switchMap(user => {
        if(user.isAuthenticated){
          let headers = new HttpHeaders();
          headers = headers.set('Authorization', `Bearer ${user.accessToken}`);

          return this.http.get<IOrder[]>(this.baseUrl + 'order/user', {headers});
        }else{
          return of(null);
        }
      })
    )
  }
}
