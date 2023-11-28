import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IDeliveryMethods } from '../shared/models/delivery.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDeliveryMethods(){
    return this.http.get<IDeliveryMethods[]>(`${this.baseUrl}delivery`).pipe(
      map((delivery) => {
        return delivery.sort((a,b) => b.price - a.price);
      })
    )
  }
}
