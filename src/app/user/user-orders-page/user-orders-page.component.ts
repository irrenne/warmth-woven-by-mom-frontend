// user-orders-page.component.ts

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../../Order';
import {Product} from '../../Product';
import {AuthorizationService} from '../../services/authorization.service';
import {HttpService} from '../../services/http.service';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css']
})
export class UserOrdersPageComponent implements OnInit {
  orders: Order[] = [];
  currentPage = 0; // Current page number
  totalItems = 0; // Total number of products
  totalPages = 0; // Total number of pages
  sortField = 'status'; // Field to sort by
  sortDirection = 'asc'; // Sorting direction

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private httpService: HttpService,
      private authService: AuthorizationService,
      private jwtHelper: JwtHelperService
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

  loadOrders(): void {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getJwtAccessToken();
      if (token != null) {
        let params = new HttpParams()
        .set('page', this.currentPage.toString())
        .set('size', 5)
        .set('sortBy', this.sortField)
        .set('sortDirection', this.sortDirection);

        const userId = this.jwtHelper.decodeToken(token).id;
        this.httpService.get(`http://localhost:9191/api/order/user/paged/${userId}`, {params}).subscribe(response => {
          this.orders = response.content;
          this.totalItems = response.totalElements;
          this.totalPages = response.totalPages;
          this.orders.forEach(order => {
            order.items.forEach(item => {
              this.httpService.get(`http://localhost:9191/api/product/${item.productId}`).subscribe((product: Product) => {
                item.product = product;
              });
            });
          });
        });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadOrders();
  }
}
