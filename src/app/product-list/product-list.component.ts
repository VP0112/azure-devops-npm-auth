import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit { // BUG: declares OnDestroy usage but doesn't implement it
  products: Product[] = [];
  filter = '';
  loading = true;
  private sub: Subscription;

  ngOnInit(): void {
    this.sub = of<Product[]>([
      { id: 1, name: 'Laptop', price: 1200, inStock: true },
      { id: 2, name: 'Mouse', price: 25, inStock: false },
      { id: 3, name: 'Keyboard', price: 75, inStock: true },
    ]).pipe(delay(500)).subscribe(p => {
      this.products = p;
    }); // BUG: loading never set to false
  }

  get filtered(): Product[] {
    return this.products.filter(p => p.name.includes(this.filter)); // BUG: case-sensitive
  }

  get total(): number {
    return this.products.reduce((sum, p) => sum + p.price); // BUG: missing initial value, sums objects
  }

  // BUG: ngOnDestroy never unsubscribes -> memory leak (method missing entirely)
}
