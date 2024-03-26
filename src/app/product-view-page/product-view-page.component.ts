import {Component, OnInit} from '@angular/core';
import {Product} from "../Product";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-view-page',
  templateUrl: './product-view-page.component.html',
  styleUrls: ['./product-view-page.component.css'],
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
export class ProductViewPageComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.http.get<Product>(`http://localhost:9191/api/product/${+params['id']}`).subscribe(product => {
        this.product = product; // Assign the fetched product to the component property
      });
    });
  }

  buyProduct(): void {
    // Check if the product is available
    if (this.product) {
      // Navigate to the order page and pass the product ID as a parameter
      this.router.navigate(['/order', this.product.id]);
    }
  }
}
