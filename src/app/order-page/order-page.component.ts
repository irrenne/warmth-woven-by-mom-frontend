import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit} from "@angular/core";
import {Product} from "../Product";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({
          opacity: 0,
          filter: 'blur(2px)'
        }),
        animate('0.3s ease-in-out',
          style({
            opacity: 1,
            filter: 'blur(0)'
          })),
      ]),
    ])
  ]
})
export class OrderPageComponent implements OnInit {
  product: Product | null = null;
  public productId: number | null = null;
  public withShipping: boolean = false;
  public confirmOrderCheckbox: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = +params['productId'];
    });
    this.route.params.subscribe(params => {
      this.http.get<Product>(`http://localhost:9191/api/product/${+params['id']}`).subscribe(product => {
        this.product = product;
      });
    });
  }

  public confirmOrder(): void {

    const orderRequest = {
      productId: this.product?.id,
      price: this.product?.price,
      withShipping: this.withShipping
    };

    this.http.post('http://localhost:9191/api/order', orderRequest).subscribe({
      next: (response: any) => {
        console.log('Order placed successfully:', response);
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error placing order:', error);
      }
    });
  }
}
