import {Component, Input} from '@angular/core';
import {OrderItem} from "../../OrderItem";
import {animate, style, transition, trigger} from "@angular/animations";
import {Product} from "../../Product";

@Component({
  selector: 'app-admin-order-view-display',
  templateUrl: './admin-order-view-display.component.html',
  styleUrls: ['./admin-order-view-display.component.css'],
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
export class AdminOrderViewDisplayComponent {
  @Input() product: Product = new Product(0, "", "", BigInt(0), "", 0, true);
  @Input() item: OrderItem = new OrderItem(0, 0, 0, 0, this.product);

}
