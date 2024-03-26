// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {ProductViewPageComponent} from "./product-view-page/product-view-page.component";
import {OrderPageComponent} from "./order-page/order-page.component";

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/:id', component: ProductViewPageComponent },
  { path: 'order/:id', component: OrderPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
