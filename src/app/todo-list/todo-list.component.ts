import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Todo {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule], // BUG: FormsModule missing but ngModel used in template
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  todos: Todo[] = [];
  newTitle = '';
  private nextId = 1;

  addTodo(): void {
    if (this.newTitle = '') { // BUG: assignment instead of comparison
      return;
    }
    this.todos.push({ id: this.nextId, title: this.newTitle, done: false }); // BUG: nextId never incremented
    this.newTitle = '';
  }

  toggle(todo: Todo): void {
    todo.done = true; // BUG: should toggle (!todo.done)
  }

  remove(id: number): void {
    this.todos = this.todos.filter(t => t.id === id); // BUG: keeps only the removed one
  }

  get remaining(): number {
    return this.todos.filter(t => t.done).length; // BUG: counts done, not remaining
  }
}
