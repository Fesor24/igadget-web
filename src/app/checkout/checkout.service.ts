import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IDeliveryMethods } from '../shared/models/delivery.model';
import { map, of, switchMap } from 'rxjs';
import { IOrder, IOrderCreate } from '../shared/models/order.model';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private accountService: AccountService) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethods[]>(`${this.baseUrl}delivery`).pipe(
      map((delivery) => {
        return delivery.sort((a,b) => b.price - a.price);
      })
    )
  }

  createOrder(order: IOrderCreate){
    return this.accountService.user$.pipe(
      switchMap(user => {
        if(user.isAuthenticated){
          let httpHeaders = new HttpHeaders();

          httpHeaders = httpHeaders.set('Authorization', `Bearer ${user.accessToken}`);

          return this.http.post<IOrder>(`${this.baseUrl}order`, order, {headers: httpHeaders});
        }else{
          this.accountService.login();
          return of(null)
        }
      })
    )

  }
}
