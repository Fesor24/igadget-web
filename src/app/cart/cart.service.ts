import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IShoppingCart, ShoppingCart } from '../shared/models/cart.model';
import IProduct from '../shared/models/product.model';
import { IShoppingCartItem } from '../shared/models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.apiUrl;

  private cartSource = new BehaviorSubject<IShoppingCart | null>(null);

  cart$ = this.cartSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getShoppingCart(id: string) {
    return this.httpClient
      .get<IShoppingCart>(this.baseUrl + 'cart/' + id)
      .pipe(map((response) => this.cartSource.next(response)));
  }

  addEditCart(cart: IShoppingCart) {
    return this.httpClient
      .post<IShoppingCart>(this.baseUrl + 'cart', cart)
      .subscribe({
        next: (cart) => this.cartSource.next(cart),
        error: (err) => console.log(err),
      });
  }

  getCurrentCartValue() {
    return this.cartSource.value;
  }

  addItemToCart(item: IProduct, quantity = 1) {
    const cartItem: IShoppingCartItem = this.mapProductToCartItem(
      item,
      quantity
    );

    const cart = this.getCurrentCartValue() ?? this.createCart();

    cart.items = this.addOrUpdateCartItem(cart.items, cartItem, quantity);

    this.addEditCart(cart);
  }

  private mapProductToCartItem(
    item: IProduct,
    quantity: number
  ): IShoppingCartItem {
    return {
      productId: item.id,
      productName: item.name,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: quantity,
      category: item.category,
      brand: item.brand,
    };
  }

  private createCart(): IShoppingCart {
    const cart = new ShoppingCart();

    localStorage.setItem('cart_id', cart.id);

    return cart;
  }

  private addOrUpdateCartItem(cartItems: IShoppingCartItem[], itemToAdd: IShoppingCartItem,
    quantity: number): IShoppingCartItem[]{
      
  const index = cartItems.findIndex(x => x.productId == itemToAdd.productId);

  if(index === -1){
    itemToAdd.quantity = quantity;
    cartItems.push(itemToAdd);
  }else{
    cartItems[index].quantity += quantity;
    cartItems.push(itemToAdd);

  }

  return cartItems;
  }

}
