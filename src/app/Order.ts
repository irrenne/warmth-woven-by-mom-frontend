import {OrderItem} from "./OrderItem";

export class Order {
  constructor(
      public id: number | null,
      public productId: number,
      public price: bigint,
      public withShipping: boolean,
      public items: OrderItem []
  ) {}
}
