export class Product {
  constructor(
    public id: number | null,
    public name: string,
    public description: string,
    public price: bigint,
    public imageUrl: string,
    public amount: number,
    public inStock: boolean
  ) {}
}
