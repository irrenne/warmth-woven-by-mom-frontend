import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from "../Product";

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']

})
export class ProductDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), true);
}
