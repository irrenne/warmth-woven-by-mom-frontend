import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {Product} from "../Product";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";
import {Order} from "../Order";
import {HttpService} from "../services/http.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(5px)'
        }),
        animate('1.5s ease-out',
            style({
              opacity: 1,
              filter: 'blur(0)'
            })),
      ]),
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({transform: 'translateX(-100%)', opacity: 0}),
        animate('2.2s ease-in-out', style({transform: 'translateX(0)', opacity: 1})),
      ]),
    ]),
  ],
})
export class LandingPageComponent {
  isTextVisible: boolean = false;
  products: Product[] = [];
  products2: Product[] = [];
  orders: Order[] = [];

  constructor(private router: Router, private http: HttpClient, public authService: AuthorizationService, private httpService: HttpService,) {
  }

  ngOnInit(): void {
    this.fetchProducts('http://localhost:9191/api/product/random', 3)
    .subscribe((data: Product[]) => {
      this.products = data;
    });

    this.fetchProducts('http://localhost:9191/api/product/random', 2)
    .subscribe((data: Product[]) => {
      this.products2 = data;
    });

    if (this.checkUserIsAdmin()) {
      this.fetchOrders()
    }
  }

  checkUserIsAdmin(): boolean {
    if (this.authService.isLoggedIn()) {
      return this.authService.isAdmin()
    }
    return false;
  }

  fetchOrders(): void {
    if (this. checkUserIsAdmin()) {
      this.httpService.get(`http://localhost:9191/api/order/all`).subscribe(response => {
        this.orders = response;
        this.orders.forEach(order => {
          order.items.forEach(item => {
            this.httpService.get(`http://localhost:9191/api/product/${item.productId}`).subscribe((product: Product) => {
              item.product = product;
            });
          });
        });
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  fetchProducts(url: string, amount: number) {
    return this.http.get<Product[]>(url, {params: {amount: amount.toString()}});
  }

  navigateToProductView(productId: number) {
    if (this.authService.isLoggedIn() && this.authService.isAdmin()) {
      this.router.navigate(['/products/edit', productId]);
    } else {
      this.router.navigate(['/products', productId]);
    }
  }

  toggleTextVisibility() {
    this.isTextVisible = !this.isTextVisible;
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
}
