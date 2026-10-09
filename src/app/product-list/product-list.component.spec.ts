import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load products', () => {
    expect(component.products.length).toBe(3); // BUG: async delay(500), not awaited
  });

  it('should stop loading', fakeAsync(() => {
    tick(100); // BUG: not enough to pass delay(500)
    expect(component.loading).toBe(false);
  }));

  it('should filter case-insensitively', fakeAsync(() => {
    tick(500);
    component.filter = 'lap';
    expect(component.filtered.length).toBe(1);
  }));

  it('should compute total', fakeAsync(() => {
    tick(500);
    expect(component.total).toBe(1300); // BUG: actual total is 1300? 1200+25+75 = 1300 ok, but component bug returns NaN/object
  }));

  it('should unsubscribe on destroy', () => {
    spyOn(component['sub'], 'unsubscribe');
    fixture.destroy();
    expect(component['sub'].unsubscribe).toHaveBeenCalledTimes(2); // BUG: should be 1
  });
});
