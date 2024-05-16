import {Component, Input} from '@angular/core';
import {Product} from "../Product";
import {Order} from "../Order";
import {animate, style, transition, trigger} from "@angular/animations";
import {OrderItem} from "../OrderItem";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";
import {UserBasicInfo} from "../UserBasicInfo";
import {HttpService} from "../services/http.service";
import {OrderStatus} from "../order-status.enum";

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(2px)'
        }),
        animate('0.6s ease-in-out',
            style({
              opacity: 1,
              filter: 'blur(0)'
            })),
      ]),
    ])
  ]

})
export class OrderDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), "", 0, true);
  @Input() orderItem: OrderItem = new OrderItem(0, 0, 0, 0, this.product);
  items: OrderItem[] = [this.orderItem];
  @Input() order: Order = new Order('', 0, BigInt(0), false, '', '', Date.prototype, Date.prototype, this.items);
  @Input() userBasicInfos: { [userId: string]: UserBasicInfo } = {};

  constructor(
      private router: Router, private authService: AuthorizationService, private httpService: HttpService
  ) {
  }

  checkUserIsAdmin(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.authService.isAdmin()
    }
    return false;
  }

  getStatusText(status: string | undefined): string {
    switch (status) {
      case 'IN_PROGRESS':
        return 'В процесі';
      case 'COMPLETE':
        return 'Виконано';
      case 'CANCELED':
        return 'Скасовано';
      default:
        return 'Невідомий статус';
    }
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'IN_PROGRESS':
        return 'status-in-progress';
      case 'COMPLETE':
        return 'status-complete';
      case 'CANCELED':
        return 'status-canceled';
      default:
        return '';
    }
  }

  navigateToProductView(productId: number | null | undefined): void {
    if (productId != null) {
      if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
        this.router.navigate(['/products/edit', productId]);
      } else {
        this.router.navigate(['/products', productId]);
      }
    }
  }

  navigateToOrderView(orderId: string | null | undefined): void {
    if (orderId != null) {
      if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
        this.router.navigate(['/order/review', orderId]);
      }
    }
  }

  cancelOrder(orderId: string | null | undefined): void {
    if (orderId != null) {
      const orderRequest = {
        items: this.order?.items,
        price: this.order?.price,
        withShipping: this.order?.withShipping,
        userId: this.order?.userId,
        status: 'CANCELED'
      };

      this.httpService.put(`http://localhost:9191/api/order/${orderId}`, orderRequest).subscribe({
        next: response => {
          console.log('Order canceled successfully');
          this.router.navigate(['/orders']);
        },
        error: error => {
          console.error('Error canceling order:', error);
        }
      });
    }
  }

  protected readonly OrderStatus = OrderStatus;
}
