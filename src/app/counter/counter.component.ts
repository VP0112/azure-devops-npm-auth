import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  @Input() start: number = 0;
  @Input() max: number = 10;
  @Output() changed = new EventEmitter<number>();

  count: number = this.start; // BUG: start is not yet set at field init

  increment(): void {
    if (this.count < this.max) {
      this.count++;
    }
    this.changed.emit(this.count);
  }

  decrement(): void {
    this.count--; // BUG: no lower bound check
    this.changed.emit(this.count);
  }

  reset(): void {
    this.count = 0; // BUG: should reset to this.start
    this.changed.emit(this.count);
  }

  get isMax(): boolean {
    return this.count > this.max; // BUG: should be >=
  }
}
