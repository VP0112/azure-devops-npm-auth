import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // BUG: runs before user is set -> ngOnInit throws
    component.user = { firstName: 'John', lastName: 'Doe', email: 'j@d.com', age: 18 };
  });

  it('should build full name', () => {
    component.ngOnInit();
    expect(component.fullName).toBe('John Doe');
  });

  it('should treat 18 as adult', () => {
    expect(component.isAdult).toBe(true);
  });

  it('should compute initials', () => {
    expect(component.initials).toBe('JD');
  });

  it('should render email', () => {
    const el = fixture.nativeElement.querySelector('.email'); // BUG: no .email class in template
    expect(el.textContent).toContain('j@d.com');
  });

  it('should build mailto', () => {
    expect(component.mailTo).toBe('mailto:j@d.com'); // BUG: method not called
  });
});
