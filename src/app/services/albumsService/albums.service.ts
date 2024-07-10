import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Albums } from '../../interface/albums';
import { Photos } from '../../interface/photos';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private domain = environment.domain;
  private HttpClient = inject(HttpClient);
  
  getAlbums(): Observable<Albums[]> {
    return this.HttpClient.get<Albums[]>(`${this.domain}/albums`);
  }

  getPhotos(): Observable<Photos[]> {
    return this.HttpClient.get<Photos[]>(`${this.domain}/photos`)
  }
}
