// cart.component.ts
import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {OrderItem} from '../OrderItem';
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";

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
              public authService: AuthorizationService) {
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
      this.router.navigate(['/login']);
    }
  }

}
