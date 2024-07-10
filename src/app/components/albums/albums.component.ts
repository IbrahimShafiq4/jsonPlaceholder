import { Component, inject, OnInit } from '@angular/core';

import { AlbumsService } from '../../services/albumsService/albums.service';
import { Albums } from '../../interface/albums';
import { Photos } from '../../interface/photos';
import { Users } from '../../interface/users';
import { UsersService } from '../../services/usersService/users.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [],
  providers: [AlbumsService, UsersService],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.css'
})

export class AlbumsComponent implements OnInit {
  AlbumsService = inject(AlbumsService);
  UsersService = inject(UsersService);

  albums: Albums[] = [];
  photos: Photos[] = [];
  user: { [userId: number]: string } = {};
  users: { username: string, userId: number }[] = [];

  ngOnInit(): void {
    this.getAlbums();
    this.onGettingPhotos();
  }

  getAlbums(): void {
    this.AlbumsService.getAlbums()
    .subscribe((albumsRes: Albums[]) => {
      this.albums = albumsRes;
      this.getUsers();
    });
  }

  getUsers(): void {
    this.UsersService.getUsers().subscribe((users: Users[]) => {
      users.forEach((user: Users) => {
        this.user[user.id] = user.name;
        this.users.push({
          username: this.user[user.id],
          userId: user.id
        });
      });
    });
  }

  onGettingPhotos(): void {
    this.AlbumsService.getPhotos().subscribe((photosResponse: Photos[]) => {
      this.photos = photosResponse;
    })
  }
}