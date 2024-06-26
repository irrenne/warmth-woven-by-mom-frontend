import {Component} from '@angular/core';
import {OrderItem} from "../OrderItem";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-order-cart-page',
  templateUrl: './order-cart-page.component.html',
  styleUrls: ['./order-cart-page.component.css']
})
export class OrderCartPageComponent {
  items: OrderItem[] = [];
  totalPrice: number = 0;
  public withShipping: boolean = false;
  public confirmOrderCheckbox: boolean = false;

  constructor(private cartService: CartService,
              private router: Router,
              public authService: AuthorizationService,
              private http: HttpClient,
              private jwtHelper: JwtHelperService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(productId: number | null | undefined): void {
    if (productId != null) {
      this.cartService.removeFromCart(productId);
    }
  }

  updateQuantity(item: OrderItem): void {
    this.cartService.updateItemQuantity(item.product?.id, item.quantity);
  }

  confirmOrder(): void {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getJwtAccessToken();
      if (token != null) {
        const userId = this.jwtHelper.decodeToken(token).id;
        const orderRequest = {
          price: this.totalPrice,
          withShipping: this.withShipping,
          userId: userId,
          items: this.items
        };

        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);

        this.http.post('http://localhost:9191/api/order', orderRequest, {headers}).subscribe({
          next: (response: any) => {
            console.log('Order placed successfully:', response);
            this.openInfoDialog('Замовлення створено успішно', '/');
          },
          error: (error: any) => {
            console.error('Error placing order:', error);
          }
        });
        this.cartService.clearCart();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  openInfoDialog(message: string, navigatePath?: string): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      data: {message: message, navigatePath: navigatePath}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([result]);
      }
    });
  }
}
