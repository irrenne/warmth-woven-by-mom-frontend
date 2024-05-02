import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from "../Product";
import {NgClass} from "@angular/common";
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {AuthorizationService} from "../services/authorization.service";

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgClass],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css'],
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
export class ProductDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), '', 0, true);

  constructor(
    private router: Router,
    private authService: AuthorizationService
  ) { }

  navigateToProductView(productId: number): void {
    // if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products', productId]);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}
