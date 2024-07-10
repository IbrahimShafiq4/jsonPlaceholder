import { Component, inject, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../../services/postsService/posts.service';
import { Posts } from '../../../interface/posts';
import { Users } from '../../../interface/users';
import { UsersService } from '../../../services/usersService/users.service';
import { Comments } from '../../../interface/comments';
import { CommentService } from '../../../services/commentsService/comment.service';
import { PostsListComponent } from '../../../shared/posts-list/posts-list.component';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [ PostsListComponent ],
  providers: [PostsService, UsersService, CommentService],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, OnChanges {
  private ActivatedRoute = inject(ActivatedRoute);
  private PostsService = inject(PostsService);
  private UsersService = inject(UsersService);
  private CommentService = inject(CommentService);

  userId: number = 0;
  posts: Posts[] = [];
  users: Users[] = [];
  comments: Comments[] = [];

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.userId = params['id'];
      this.fetchPosts();
      this.fetchUsers();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.fetchPosts();
    }
  }

  private fetchPosts(): void {
    this.PostsService.getCertainUserPosts(this.userId).subscribe((res) => {
      this.posts = res;
    });
  }

  private fetchUsers(): void {
    this.UsersService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
    });
  }

  fetchComments(): void {
    this.CommentService.getComments().subscribe((comments: Comments[]) => {
      this.comments = comments;
    });
  }
}
