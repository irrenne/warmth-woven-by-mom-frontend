import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { AuthorizationService } from '../services/authorization.service';
import { Product } from '../Product';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({opacity: 0, filter: 'blur(2px)'}),
        animate('0.3s ease-in-out', style({opacity: 1, filter: 'blur(0)'})),
      ]),
    ])
  ]
})
export class ProductEditPageComponent implements OnInit {
  product: Product | null = null;
  productForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private httpService: HttpService,
      public authService: AuthorizationService
  ) {
    this.productForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      imageUrl: [''],
      amount: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = +params['id'];
      if (productId) {
        this.httpService.get(`http://localhost:9191/api/product/${productId}`).subscribe((product: Product) => {
          this.product = product;
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            amount: product.amount
          });
        });
      }
    });
  }

  saveChanges() {
    if (this.product && this.productForm.valid) {
      const updatedProduct = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        imageUrl: this.productForm.value.imageUrl,
        amount: this.productForm.value.amount
      };
      this.httpService.put(`http://localhost:9191/api/product/${this.product.id}`, updatedProduct).subscribe(response => {
        console.log('Product updated successfully');
        this.router.navigate(['/products']);
      });
    }
  }
}
