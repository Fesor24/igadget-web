import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IShoppingCart, IShoppingCartTotals, ShoppingCart } from '../shared/models/cart.model';
import IProduct from '../shared/models/product.model';
import { IShoppingCartItem } from '../shared/models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl = environment.apiUrl;

  private cartSource = new BehaviorSubject<IShoppingCart | null>(null);

  cart$ = this.cartSource.asObservable();

  private cartTotalsSource = new BehaviorSubject<IShoppingCartTotals>({
    shipping: 0,
    totals: 0,
    subtotals: 0
  });

  cartTotal$ = this.cartTotalsSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getShoppingCart(id: string) {
    return this.httpClient
      .get<IShoppingCart>(this.baseUrl + 'cart/' + id)
      .pipe(
        map((response) => {
          this.cartSource.next(response)
          this.calculateCartTotals();
        }));
  }

  addEditCart(cart: IShoppingCart) {
    return this.httpClient
      .post<IShoppingCart>(this.baseUrl + 'cart', cart)
      .subscribe({
        next: (cart) => {
          this.cartSource.next(cart);
          this.calculateCartTotals();
        },
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

  incrementItem(item: IShoppingCartItem){
    const cart = this.getCurrentCartValue();

    if(!cart) return;

    const itemIndex = cart.items.findIndex(
      (x) => x.productId == item.productId
    );

    cart.items[itemIndex].quantity++;

    this.addEditCart(cart);
  }

  decrementItem(item: IShoppingCartItem){
    const cart = this.getCurrentCartValue();

    if (!cart) return;

    const itemIndex = cart.items.findIndex(
      (x) => x.productId == item.productId
    );

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity--;
      this.addEditCart(cart);
    }else{
      this.removeItem(cart.items[itemIndex]);
    }
  }

  removeItem(item: IShoppingCartItem){
    const cart = this.getCurrentCartValue();

    if(!cart) return;

    if(cart.items.some(x => x.productId === item.productId)){
      cart.items = cart.items.filter(x => x.productId !== item.productId);

      if(cart.items.length > 0){
        this.addEditCart(cart);
      }else{
        this.deleteBasket(cart)
      }
    }
  }

  deleteBasket(cart: IShoppingCart){
    return this.httpClient.delete(this.baseUrl + 'cart/' + cart.id).subscribe({
      next: () => {
        this.cartSource.next(null);
        this.cartTotalsSource.next({shipping: 0, subtotals: 0, totals: 0})
        localStorage.removeItem('cart_id');
      },
      error: err => console.log(err)
    });
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

  }

  return cartItems;
  }

  private calculateCartTotals(){

    const cart = this.getCurrentCartValue();

    const shipping = 0;
    const subtotals = cart && cart.items ? cart.items.reduce((a,b) => b.quantity * b.price + a, 0) : 0;
    const totals = shipping + subtotals;

    this.cartTotalsSource.next({shipping, subtotals, totals})
  }

}
