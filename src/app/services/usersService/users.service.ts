import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../../interface/users';
import { environment } from '../../../environments/environment';

@Injectable()
export class UsersService {
  private domain = environment.domain;
  private httpClient = inject(HttpClient);

  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>(`${this.domain}/users`)
  }

  getUserDetails(id: number): Observable<Users> {
    return this.httpClient.get<Users>(`${this.domain}/users/${id}`)
  }
}
