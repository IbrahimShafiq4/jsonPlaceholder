import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/usersService/users.service';
import { Users } from '../../../interface/users';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../../services/postsService/posts.service';
import { Posts } from '../../../interface/posts';
import { AlbumsService } from '../../../services/albumsService/albums.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [],
  providers: [UsersService, PostsService, AlbumsService],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  ActivatedRoute = inject(ActivatedRoute);
  UsersService = inject(UsersService);
  PostsService = inject(PostsService);

  userDetails?: Users;
  userId: number = 0;
  userPosts: number = 0;

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.onGettingUserDetails(this.userId);
      this.PostsService.getCertainUserPosts(this.userId).subscribe((posts: Posts[]) => {
        this.userPosts = posts.length;
        console.log(this.userPosts)
      })
    })
  }

  onGettingUserDetails(id: number): void {
    this.UsersService.getUserDetails(id).subscribe((userDetails: Users) => {
      this.userDetails = userDetails;
    })
  }
}
