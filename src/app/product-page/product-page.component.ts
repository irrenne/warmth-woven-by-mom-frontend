import { Component } from '@angular/core';
import {Product} from "../Product";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>(
      "http://localhost:9191/api/product"
    ).subscribe(data => this.products = data);
  }
}
