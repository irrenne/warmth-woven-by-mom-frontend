import {Component} from '@angular/core';
import {Product} from "./Product";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>(
      "http://localhost:9191/api/product"
    ).subscribe(data => this.products = data);
  }
}
