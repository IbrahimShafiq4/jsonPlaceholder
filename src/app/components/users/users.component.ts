import { Component, inject, OnInit } from '@angular/core';
import { Users } from '../../interface/users';
import { UsersService } from '../../services/usersService/users.service';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule, NgClass],
  providers: [UsersService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  userOption: boolean = false;
  activeUser: number | null = null;

  private UsersService = inject(UsersService);

  ngOnInit(): void {
    this.onGettingAllUsers();
  }

  onGettingAllUsers(): void {
    this.UsersService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });
  }

  toggleUser(index: number): void {
    if (this.activeUser === index) {
      this.activeUser = null;
    } else {
      this.activeUser = index;
    }
  }
}
