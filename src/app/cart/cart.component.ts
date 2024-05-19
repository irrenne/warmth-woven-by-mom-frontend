// cart.component.ts
import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {OrderItem} from '../OrderItem';
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";
import {InfoDialogComponent} from "../info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: OrderItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
              private router: Router,
              public authService: AuthorizationService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  removeFromCart(productId: number | null | undefined): void {
    if (productId != null) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  updateQuantity(item: OrderItem): void {
    this.cartService.updateItemQuantity(item.product?.id, item.quantity);
  }

  buyProducts(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/order-products']);
    } else {
      this.openInfoDialog('Щоб оформити замовленння, потрібно увійти', '/login');
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
