import {Component} from '@angular/core';
import {Order} from "../../Order";
import {Router} from "@angular/router";
import {HttpService} from "../../services/http.service";
import {AuthorizationService} from "../../services/authorization.service";
import {HttpParams} from "@angular/common/http";
import {Product} from "../../Product";
import {UserBasicInfo} from "../../UserBasicInfo";
import {OrderStatus} from "../../order-status.enum";

@Component({
  selector: 'app-admin-orders-page',
  templateUrl: './admin-orders-page.component.html',
  styleUrls: ['./admin-orders-page.component.css']
})
export class AdminOrdersPageComponent {
  orders: Order[] = [];
  currentPage = 0; // Current page number
  totalItems = 0; // Total number of products
  totalPages = 0; // Total number of pages
  sortField = 'status'; // Field to sort by
  sortDirection = 'asc'; // Sorting direction
  filterStatus = '';
  userBasicInfos: { [userId: string]: UserBasicInfo } = {};
  orderStatuses = Object.values(OrderStatus);

  statusDisplayMap = {
    [OrderStatus.IN_PROGRESS]: 'В процесі',
    [OrderStatus.COMPLETE]: 'Завершено',
    [OrderStatus.CANCELED]: 'Скасовано'
  };

  constructor(
      private router: Router,
      private httpService: HttpService,
      private authService: AuthorizationService,
  ) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  sort(field: string) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadOrders();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadOrders();
  }

  filterOrders() {
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      let params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('size', 5)
      .set('sortBy', this.sortField)
      .set('sortDirection', this.sortDirection);

      if (this.filterStatus) {
        params = params.set('status', this.filterStatus);
      }

      this.httpService.get(`http://localhost:9191/api/order/paged`, {params}).subscribe(response => {
        this.orders = response.content;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
        this.orders.forEach(order => {
          order.items.forEach(item => {
            this.httpService.get(`http://localhost:9191/api/product/${item.productId}`).subscribe((product: Product) => {
              item.product = product;
            });
          });
          this.httpService.get(`http://localhost:9191/api/users/basic-info/${order.userId}`).subscribe((userBasicInfo: UserBasicInfo) => {
            this.userBasicInfos[order.userId] = userBasicInfo;
          });
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }
}
