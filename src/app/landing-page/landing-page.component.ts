import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {trigger, transition, style, animate} from '@angular/animations';
import {Product} from "../Product";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

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

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts('http://localhost:9191/api/product/random', 3)
    .subscribe((data: Product[]) => {
      this.products = data;
    });

    this.fetchProducts('http://localhost:9191/api/product/random', 2)
    .subscribe((data: Product[]) => {
      this.products2 = data;
    });
  }

  fetchProducts(url: string, amount: number) {
    return this.http.get<Product[]>(url, { params: { amount: amount.toString() } });
  }

  navigateToProductView(productId: number) {
    this.router.navigate(['/products', productId]);
  }

  toggleTextVisibility() {
    this.isTextVisible = !this.isTextVisible;
  }
}
