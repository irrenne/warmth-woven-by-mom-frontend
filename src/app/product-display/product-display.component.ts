import {Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from "../Product";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgClass],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']

})
export class ProductDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), true);
}
