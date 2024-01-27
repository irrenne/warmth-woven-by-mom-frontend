export class Product {
  constructor(
    public id: number | null,
    public name: string,
    public description: string,
    public price: bigint,
    public inStock: boolean
  ) {}
}
