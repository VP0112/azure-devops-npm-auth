import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  avatarUrl?: string;
}

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent implements OnInit {
  @Input() user: User;  // BUG: strict init error, no ! or default
  fullName: string;

  ngOnInit(): void {
    this.fullName = this.user.firstName + this.user.lastName; // BUG: missing space
  }

  get isAdult(): boolean {
    return this.user.age > 18; // BUG: should be >= 18
  }

  get initials(): string {
    return this.user.firstName[0] + this.user.lastName[1]; // BUG: index 1 instead of 0
  }

  mailTo(): string {
    return 'mailto: ' + this.user.email; // BUG: stray space in mailto
  }
}
