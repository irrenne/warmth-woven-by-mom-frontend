import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProductDisplayComponent} from './product-display/product-display.component';
import {HttpClientModule} from "@angular/common/http";
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {ProductPageComponent} from './product-page/product-page.component';
import {AppRoutingModule} from "./app-routing.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {NgOptimizedImage} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import { FooterComponent } from './footer/footer.component';
import { ProductViewPageComponent } from './product-view-page/product-view-page.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { OrderPageComponent } from './order-page/order-page.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductPageComponent,
    FooterComponent,
    ProductViewPageComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ProductDisplayComponent,
    HttpClientModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    NgOptimizedImage,
    FlexLayoutModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  toggleSidenav(sidenav: any) {
    sidenav.toggle();
  }
}
