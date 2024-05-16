// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderItem } from '../OrderItem';
import { Product } from '../Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsSubject = new BehaviorSubject<OrderItem[]>(this.loadInitialCart());
  items$ = this.itemsSubject.asObservable();

  constructor() { }

  private loadInitialCart(): OrderItem[] {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private saveCart(items: OrderItem[]): void {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  addToCart(product: Product, quantity: number): void {
    const currentItems = this.itemsSubject.value;
    const existingItem = currentItems.find(item => item.productId === product.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= product.amount) {
        existingItem.quantity = newQuantity;
      } else {
        existingItem.quantity = product.amount;
      }
    } else {
      const newItem = new OrderItem(null, null, product.id, quantity, product);
      currentItems.push(newItem);
    }
    this.itemsSubject.next(currentItems);
    this.saveCart(currentItems);
  }

  removeFromCart(productId: number): void {
    const updatedItems = this.itemsSubject.value.filter(item => item.productId !== productId);
    this.itemsSubject.next(updatedItems);
    this.saveCart(updatedItems);
  }

  clearCart(): void {
    this.itemsSubject.next([]);
    this.saveCart([]);
  }

  getItems(): OrderItem[] {
    return this.itemsSubject.value;
  }

  getTotalPrice(): number {
    return this.itemsSubject.value.reduce((total, item) => {
      const price = Number(item.product?.price || 0);
      return total + price * item.quantity;
    }, 0);
  }

  updateItemQuantity(productId: number | null | undefined, quantity: number): void {
    const items = this.itemsSubject.value;
    const item = items.find(item => item.product?.id === productId);
    if (item) {
      item.quantity = quantity;
      this.itemsSubject.next(items);
    }
  }


}
