import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../services/postsService/posts.service';
import { UsersService } from '../../services/usersService/users.service';
import { CommentService } from '../../services/commentsService/comment.service';
import { Posts } from '../../interface/posts';
import { Users } from '../../interface/users';
import { Comments } from '../../interface/comments';
import { PostsListComponent } from '../../shared/posts-list/posts-list.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [ PostsListComponent ],
  providers: [PostsService, UsersService, CommentService],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  fullPosts: Posts[] = [];
  usersName: Users[] = [];
  comments: Comments[] = [];

  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
    private commentsService: CommentService
  ) {}

  ngOnInit(): void {
    this.onGettingPosts();
    this.onGettingUsers();
    this.onGettingComments();
  }

  onGettingPosts(): void {
    this.postsService.getFullPosts().subscribe((posts: Posts[]) => {
      this.fullPosts = posts;
    });
  }

  onGettingUsers(): void {
    this.usersService.getUsers().subscribe((users: Users[]) => {
      this.usersName = users;
    });
  }

  onGettingComments(): void {
    this.commentsService.getComments().subscribe((comments: Comments[]) => {
      this.comments = comments;
    });
  }
}
