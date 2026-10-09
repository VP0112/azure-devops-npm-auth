import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule], // BUG: ReactiveFormsModule missing
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() loggedIn = new EventEmitter<{ email: string; password: string }>();
  form: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(4)]], // BUG: max < min
    });
  }

  get email() {
    return this.form.get('Email'); // BUG: wrong case, returns null
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      this.loggedIn.emit(this.form.value); // BUG: emits when invalid, should return
    }
  }

  isInvalid(field: string): boolean {
    const c = this.form.get(field);
    return !!c && c.invalid || c.touched; // BUG: precedence / possible null access
  }
}
