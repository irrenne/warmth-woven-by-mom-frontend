import {Component} from '@angular/core';
import {Product} from "../Product";
import {HttpClient, HttpParams} from "@angular/common/http";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
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
export class ProductPageComponent {
  products: Product[] = [];
  emptyProduct: Product = new Product(0, "", "", BigInt(0),'',0, true);
  itemsPerRow = 3; // Number of products to display per row
  currentPage = 0; // Current page number
  totalItems = 0; // Total number of products
  totalPages = 0; // Total number of pages
  searchQuery = ''; // Search query
  sortField = 'price'; // Field to sort by
  sortDirection = 'asc'; // Sorting direction
  inStockOnly = false; // Show only in-stock products

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    let params = new HttpParams()
    .set('page', this.currentPage.toString())
    .set('size', 9)
    .set('sortBy', this.sortField)
    .set('sortDirection', this.sortDirection);

    if (this.searchQuery) {
      params = params.set('name', this.searchQuery);
    }

    if (this.inStockOnly) {
      params = params.set('inStock', 'true');
    }

    this.http.get<any>('http://localhost:9191/api/product/paged', {params}).subscribe(response => {
      this.products = response.content;
      this.totalItems = response.totalElements;
      this.totalPages = response.totalPages;
    });
  }

  search() {
    this.currentPage = 0;
    this.loadProducts();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  toggleInStock() {
    this.currentPage = 0;
    this.loadProducts();
  }

  sort(field: string) {
    if (field === this.sortField) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.loadProducts();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.loadProducts();
  }

  get productRows() {
    const rows = [];
    for (let i = 0; i < this.products.length; i += this.itemsPerRow) {
      rows.push(this.products.slice(i, i + this.itemsPerRow));
    }
    return rows;
  }
}
