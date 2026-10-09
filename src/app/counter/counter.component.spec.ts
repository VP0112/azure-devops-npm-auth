import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    // BUG: missing fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment', () => {
    component.increment();
    expect(component.count).toBe(2); // BUG: wrong expected value
  });

  it('should not go below zero', () => {
    component.decrement();
    expect(component.count).toBe(0); // fails because of component bug
  });

  it('should emit on increment', () => {
    spyOn(component.changed, 'emit');
    component.increment();
    expect(component.changed.emit).toHaveBeenCalledWith('1'); // BUG: string vs number
  });

  it('should reset', () => {
    component.start = 5;
    component.increment();
    component.reset();
    expect(component.count).toBe(5);
  });
});
