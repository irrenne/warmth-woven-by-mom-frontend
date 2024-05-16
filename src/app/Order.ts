import {OrderItem} from "./OrderItem";

export class Order {
  constructor(
      public id: string | null,
      public productId: number,
      public price: bigint,
      public withShipping: boolean,
      public status: string,
      public userId: string,
      public createdAt: Date,
      public updatedAt: Date,
      public items: OrderItem []
  ) {}
}
