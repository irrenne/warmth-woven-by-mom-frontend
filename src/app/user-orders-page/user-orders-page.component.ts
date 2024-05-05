// user-orders-page.component.ts

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Order} from '../Order';
import {Product} from '../Product';
import {AuthorizationService} from '../services/authorization.service';
import {HttpService} from '../services/http.service';
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-user-orders-page',
  templateUrl: './user-orders-page.component.html',
  styleUrls: ['./user-orders-page.component.css']
})
export class UserOrdersPageComponent implements OnInit {
  orders: Order[] = [];

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

  loadOrders(): void {
    if (this.authService.isLoggedIn()) {
      const token = this.authService.getJwtAccessToken();
      if (token != null) {
        const userId = this.jwtHelper.decodeToken(token).id;
        this.httpService.get(`http://localhost:9191/api/order/user/${userId}`).subscribe((orders: Order[]) => {
          this.orders = orders;
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
}
