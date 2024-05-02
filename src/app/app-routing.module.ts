// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {ProductViewPageComponent} from "./product-view-page/product-view-page.component";
import {OrderPageComponent} from "./order-page/order-page.component";
import {UserLoginPageComponent} from "./user-login-page/user-login-page.component";
import {
  UserRegistrationPageComponent
} from "./user-registration-page/user-registration-page.component";
import {UserOrdersPageComponent} from "./user-orders-page/user-orders-page.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/:id', component: ProductViewPageComponent },
  { path: 'order/:id', component: OrderPageComponent },
  { path: "login", component: UserLoginPageComponent},
  { path: "register", component: UserRegistrationPageComponent},
  { path: 'orders', component: UserOrdersPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
