import {Component, OnInit} from '@angular/core';
import {Product} from "../Product";
import {ActivatedRoute, Router} from "@angular/router";
import {animate, style, transition, trigger} from "@angular/animations";
import {HttpService} from "../services/http.service";
import {AuthorizationService} from "../services/authorization.service";

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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthorizationService, private httpService: HttpService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      this.httpService.get(`http://localhost:9191/api/product/${productId}`).subscribe(product => {
        this.product = product; // Assign the fetched product to the component property
      });
    });
  }

  buyProduct(): void {
    // Check if the product is available
    if (this.authService.isLoggedIn()) {
      if (this.product) {
        // Navigate to the order page and pass the product ID as a parameter
        this.router.navigate(['/order', this.product.id]);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
