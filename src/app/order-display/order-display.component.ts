import {Component, Input} from '@angular/core';
import {Product} from "../Product";
import {Order} from "../Order";
import {animate, style, transition, trigger} from "@angular/animations";
import {OrderItem} from "../OrderItem";

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css'],
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
export class OrderDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), "", 0, true);
  @Input() orderItem: OrderItem = new OrderItem(0, 0, 0, 0, this.product);
  items: OrderItem[] = [this.orderItem];
  @Input() order: Order = new Order(0, 0, BigInt(0), false, this.items);
}
