import {Product} from "./Product";

export class OrderItem {
  constructor(
      public id: number | null,
      public orderId: number | null = null,
      public productId: number | null,
      public quantity: number,
      public product?: Product
  ) {}
}
