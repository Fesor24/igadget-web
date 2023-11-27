import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(x => x.HomeModule)},
  {path: 'shop', loadChildren: () => import('./shop/shop.module').then(x => x.ShopModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(x => x.CartModule)},
  {path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(x => x.CheckoutModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(x => x.AccountModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
