import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent], // BUG: standalone component must be in imports
    });
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should add a todo', () => {
    component.newTitle = 'Test';
    component.addTodo();
    expect(component.todos.length).toBe(1);
  });

  it('should toggle a todo twice', () => {
    component.newTitle = 'Test';
    component.addTodo();
    component.toggle(component.todos[0]);
    component.toggle(component.todos[0]);
    expect(component.todos[0].done).toBeTrue();  // BUG: should be false after two toggles
  });

  it('should remove a todo', async () => {   // BUG: async with no await
    component.newTitle = 'A';
    component.addTodo();
    component.remove(1);
    expect(component.todos.length).toEqual('0'); // BUG: type mismatch
  });

  it('should count remaining', () => {
    component.newTitle = 'A';
    component.addTodo();
    expect(component.remaining).toBe(0); // BUG: one item remaining
  });
});
