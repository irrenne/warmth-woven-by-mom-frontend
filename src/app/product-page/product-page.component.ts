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
  emptyProduct: Product = new Product(0, "", "", BigInt(0), true);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>(
      "http://localhost:9191/api/product"
    ).subscribe(data => this.products = data);
  }

  itemsPerRow = 3; // Number of products to display per row

  get productRows() {
    const rows = [];
    for (let i = 0; i < this.products.length; i += this.itemsPerRow) {
      rows.push(this.products.slice(i, i + this.itemsPerRow));
    }
    return rows;
  }
}
