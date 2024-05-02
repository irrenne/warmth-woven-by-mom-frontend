import {Component, Input} from '@angular/core';
import {Product} from "../Product";
import {Order} from "../Order";

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']

})
export class OrderDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), "", 0, true);
  @Input() order: Order = new Order(0, 0, BigInt(0), false, this.product);
}
