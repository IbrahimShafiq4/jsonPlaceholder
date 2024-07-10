import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TodosComponent } from './components/todos/todos.component';
import { UserPostsComponent } from './components/todos/user-posts/user-posts.component';
import { CommentsComponent } from './components/comments/comments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, title: 'home' },
    {
        path: 'users', component: UsersComponent, title: 'users', children: [
            { path: ':id/details', component: UserDetailsComponent, title: 'user-details' },
            { path: ':id', component: UserPostsComponent, title: 'user-post' }
        ]
    },
    { path: 'posts', component: PostsComponent, title: 'posts' },
    { path: 'comments', component: CommentsComponent, title: 'posts' },
    { path: 'albums', component: AlbumsComponent, title: 'albums' },
    { path: 'todos', component: TodosComponent, title: 'todos' },
    { path: '**', component: NotFoundComponent, title: 'not-found' }
];