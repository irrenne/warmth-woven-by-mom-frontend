import {LOCALE_ID, NgModule} from '@angular/core';
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
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FooterComponent} from './footer/footer.component';
import {ProductViewPageComponent} from './product-view-page/product-view-page.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {OrderPageComponent} from './order-page/order-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserLoginPageComponent} from './user-login-page/user-login-page.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {JwtModule} from "@auth0/angular-jwt";
import {
  UserRegistrationPageComponent
} from './user/user-registration-page/user-registration-page.component';
import {UserOrdersPageComponent} from './user/user-orders-page/user-orders-page.component';
import {OrderDisplayComponent} from './order-display/order-display.component';
import {CartComponent} from './cart/cart.component';
import {OrderCartPageComponent} from './order-cart-page/order-cart-page.component';
import {UserAppComponentComponent} from './user/user-app-component/user-app-component.component';
import {
  AdminAppComponentComponent
} from './admin/admin-app-component/admin-app-component.component';
import localeUk from '@angular/common/locales/uk';
import { AdminOrdersPageComponent } from './admin/admin-orders-page/admin-orders-page.component';
import { ProductEditPageComponent } from './product-edit-page/product-edit-page.component';
import { AdminOrderEditReviewPageComponent } from './admin/admin-order-edit-review-page/admin-order-edit-review-page.component';
import { AdminOrderViewDisplayComponent } from './admin/admin-order-view-display/admin-order-view-display.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

registerLocaleData(localeUk);
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProductPageComponent,
    FooterComponent,
    ProductViewPageComponent,
    OrderPageComponent,
    UserLoginPageComponent,
    UserRegistrationPageComponent,
    UserOrdersPageComponent,
    OrderDisplayComponent,
    CartComponent,
    OrderCartPageComponent,
    UserAppComponentComponent,
    AdminAppComponentComponent,
    AdminOrdersPageComponent,
    ProductEditPageComponent,
    AdminOrderEditReviewPageComponent,
    AdminOrderViewDisplayComponent,
    ErrorDialogComponent,
    InfoDialogComponent
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
    MatDialogModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    NgOptimizedImage,
    FlexLayoutModule,
    MatExpansionModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwtToken'),
      },
    }),
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'uk-UA' }],
  bootstrap: [AppComponent]
})
export class AppModule {
  toggleSidenav(sidenav: any) {
    sidenav.toggle();
  }
}
