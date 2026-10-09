import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      // BUG: FormBuilder provider / ReactiveFormsModule not provided in test
    }).compileComponents();
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid when empty', () => {
    expect(component.form.valid).toBeTruthy(); // BUG: should be falsy
  });

  it('should validate email', () => {
    component.form.controls['email'].setValue('not-an-email');
    expect(component.email.valid).toBe(false);
  });

  it('should not emit when invalid', () => {
    spyOn(component.loggedIn, 'emit');
    component.onSubmit();
    expect(component.loggedIn.emit).toHaveBeenCalled(); // BUG: should be not.toHaveBeenCalled
  });

  it('should emit valid values', () => {
    spyOn(component.loggedIn, 'emit');
    component.form.setValue({ email: 'a@b.com', password: 'abc' }); // BUG: password too short
    component.onSubmit();
    expect(component.loggedIn.emit).toHaveBeenCalledWith({ email: 'a@b.com', password: 'abcdefgh' });
  });
});
