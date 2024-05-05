import {Product} from "./Product";

export class OrderItem {
  constructor(
    public id: number | null,
    public orderId: number,
    public productId: number,
    public quantity: number,
    public product?: Product
  ) {}
}
