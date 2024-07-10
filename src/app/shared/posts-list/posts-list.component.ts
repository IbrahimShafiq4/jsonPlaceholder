import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


import { Posts } from '../../interface/posts';
import { Comments } from '../../interface/comments';
import { Users } from '../../interface/users';
import { UsersService } from '../../services/usersService/users.service';
import { CommentService } from '../../services/commentsService/comment.service';
import { PostsService } from '../../services/postsService/posts.service';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent {

  private ActivatedRoute = inject(ActivatedRoute);

  private postsService = inject(PostsService);
  private usersService = inject(UsersService);
  private commentsService = inject(CommentService);

  @Input() posts: Posts[] = [];
  @Input() comments: Comments[] = [];
  @Input() users: Users[] = [];
  date: number = 0;
  randomDateOffset: number = 0;

  isOpen: { [postId: number]: boolean } = {};
  isCommentOpened: { [commentId: number]: boolean } = {};
  isReplayOpened: { [commentId: number]: boolean } = {};
  showComment: boolean = false;
  currentPostId: number | null = null;
  likes: { [postId: number]: number } = {};
  commentLikes: { [commentId: number]: number } = {};
  allowReplay: { [commentId: number]: boolean } = {};
  replay: { [commentId: number]: string[] } = {};
  userId: number = 0;
  userName: string = '';
  validUserName: boolean = false;

  commentReplayForm!: FormGroup;
  createPost!: FormGroup;

  ngOnInit(): void {
    this.loadFromLocalStorage();
    if (!this.posts.length || !this.users.length || !this.comments.length) {
      this.onGettingPosts();
      this.onGettingUsers();
      this.onGettingComments();
    }
    this.date = new Date().getHours();

    this.commentReplayForm = new FormGroup({
      commentInput: new FormControl(null, Validators.required)
    })

    this.createPost = new FormGroup({
      postValue: new FormControl(null, Validators.required)
    })

    this.ActivatedRoute.params.subscribe((params: Params) => {
      this.userId = +params['id'];
      if (this.userId) {
        this.validUserName = !this.validUserName
      }
    })
  }

  onGettingPosts(): void {
    this.postsService.getFullPosts().subscribe((posts: Posts[]) => {
      this.posts = posts;
      this.saveToLocalStorage('fullPosts', posts);
    });
  }

  onGettingUsers(): void {
    this.usersService.getUsers().subscribe((users: Users[]) => {
      this.users = users;
      this.saveToLocalStorage('usersName', users);
    });
  }

  onGettingComments(): void {
    this.commentsService.getComments().subscribe((comments: Comments[]) => {
      this.comments = comments;
      this.saveToLocalStorage('comments', comments);
    });
  }

  saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  loadFromLocalStorage(): void {
    const storedPosts = localStorage.getItem('fullPosts');
    if (storedPosts) {
      this.posts = JSON.parse(storedPosts);
    }

    const storedUsers = localStorage.getItem('usersName');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      this.comments = JSON.parse(storedComments);
    }
  }

  onOpenDropdown(id: number, type: string, replayIndex?: number): void {
    if (type === 'post') {
      this.isOpen[id] = !this.isOpen[id];
    } else if (type === 'comment') {
      this.isCommentOpened[id] = !this.isCommentOpened[id];
    } else if (type === 'replay') {
      this.isReplayOpened[id] = !this.isReplayOpened[id];
      for (const key in this.isReplayOpened) {
        if (key !== id.toString()) {
          this.isReplayOpened[key] = false;
        }
      }
    }
  }

  onDelete(id: number, type: string, commentId?: number, replayIndex?: number): void {
    if (type === 'post') {
      this.postsService.deletePost(id).subscribe(() => {
        const index = this.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          this.posts.splice(index, 1);
          this.saveToLocalStorage('fullPosts', this.posts);
        }
      });
    } else if (type === 'comment' && commentId) {
      const index = this.comments.findIndex(comment => comment.id === commentId && comment.postId === id);
      if (index !== -1) {
        this.comments.splice(index, 1);
        this.saveToLocalStorage('comments', this.comments);
      }
    } else if (type === 'replay' && commentId !== undefined && replayIndex !== undefined) {
      if (this.replay[commentId]) {
        this.replay[commentId].splice(replayIndex, 1);
      }
    }
  }

  showComments(postId: number): void {
    if (this.showComment && this.currentPostId === postId) {
      this.showComment = false;
      this.currentPostId = null;
    } else {
      this.showComment = true;
      this.currentPostId = postId;
    }
  }

  postLike(postId: number): void {
    if (!this.likes[postId]) {
      this.likes[postId] = 1;
    } else {
      if (this.likes[postId] === 1) {
        this.likes[postId]--;
      }
    }
  }

  commentLike(commentId: number): void {
    if (!this.commentLikes[commentId]) {
      this.commentLikes[commentId] = 1;
    } else {
      if (this.commentLikes[commentId] === 1) {
        this.commentLikes[commentId]--;
      }
    }
  }

  addReplay(commentId: number) {
    this.allowReplay[commentId] = !this.allowReplay[commentId];
  }

  removeReplay(commentId: number) {
    this.allowReplay[commentId] = !this.allowReplay[commentId];
  }

  onSubmitCommentReplay(commentId: number): void {
    const replayText = this.commentReplayForm.get('commentInput')?.value;
    if (!this.replay[commentId]) {
      this.replay[commentId] = [];
    }
    this.replay[commentId].push(replayText);
    this.commentReplayForm.reset();
    this.allowReplay[commentId] = false;
  }

  updateUserName() {
    const foundUser = this.users.find(user => user.id === this.userId);
    this.userName = foundUser ? foundUser.name : '';
  }

  cancelPost() {

  }

  addPost(): void {
    console.log(this.createPost.get('postValue')?.value);
  }
}
