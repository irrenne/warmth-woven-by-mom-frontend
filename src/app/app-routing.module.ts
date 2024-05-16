// app-routing.module.ts

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {ProductViewPageComponent} from "./product-view-page/product-view-page.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {UserLoginPageComponent} from "./user-login-page/user-login-page.component";
import {
  UserRegistrationPageComponent
} from "./user/user-registration-page/user-registration-page.component";
import {UserOrdersPageComponent} from "./user/user-orders-page/user-orders-page.component";
import {CartComponent} from "./cart/cart.component";
import {OrderCartPageComponent} from "./order-cart-page/order-cart-page.component";
import {AdminOrdersPageComponent} from "./admin/admin-orders-page/admin-orders-page.component";
import {AuthGuard} from "./guard/auth-guard.guard";
import {AdminGuard} from "./guard/admin-guard.guard";
import {ProductEditPageComponent} from "./product-edit-page/product-edit-page.component";
import {
  AdminOrderEditReviewPageComponent
} from "./admin/admin-order-edit-review-page/admin-order-edit-review-page.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'products', component: ProductPageComponent},
  {path: 'products/:id', component: ProductViewPageComponent},
  {path: 'products/edit/:id', component: ProductEditPageComponent, canActivate: [AdminGuard]},
  {path: 'order/review/:id', component: AdminOrderEditReviewPageComponent, canActivate: [AdminGuard]},
  {path: 'order/:id', component: OrderPageComponent, canActivate: [AuthGuard]},
  {path: "login", component: UserLoginPageComponent},
  {path: "register", component: UserRegistrationPageComponent},
  {path: 'orders', component: UserOrdersPageComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent},
  {path: 'order-products', component: OrderCartPageComponent},
  {path: 'all/orders', component: AdminOrdersPageComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
