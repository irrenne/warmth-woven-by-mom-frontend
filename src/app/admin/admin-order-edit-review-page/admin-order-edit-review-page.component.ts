import {Component, OnInit} from '@angular/core';
import {Order} from "../../Order";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {AuthorizationService} from "../../services/authorization.service";
import {Product} from "../../Product";
import {OrderStatus} from "../../order-status.enum";

@Component({
  selector: 'app-admin-order-edit-review-page',
  templateUrl: './admin-order-edit-review-page.component.html',
  styleUrls: ['./admin-order-edit-review-page.component.css']
})
export class AdminOrderEditReviewPageComponent implements OnInit {
  order: Order | null = null;
  updatedStatus: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    public authService: AuthorizationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderId = params['id'];
      console.log('Received orderId:', orderId);
      if (orderId) {
        this.httpService.get(`http://localhost:9191/api/order/${orderId}`).subscribe(order => {
          this.order = order;
          this.updatedStatus = order.status;
          this.order?.items.forEach(item => {
            this.httpService.get(`http://localhost:9191/api/product/${item.productId}`).subscribe((product: Product) => {
              item.product = product;
            });
          });
        });
      }
    });
  }

  updateStatus(): void {
    if (this.updatedStatus != OrderStatus.CANCELED) {
      if (this.order) {
        const updatedOrder = {
          ...this.order,
          status: this.updatedStatus
        };

        this.httpService.put(`http://localhost:9191/api/order/${this.order.id}`, updatedOrder)
        .subscribe({
          next: response => {
            console.log('Order status updated successfully');
            this.router.navigate(['/all/orders']);
          },
          error: error => {
            console.error('Error updating order status:', error);
          }
        });
      }
    }
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

  protected readonly OrderStatus = OrderStatus;
}
