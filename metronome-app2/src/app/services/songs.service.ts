import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class SongsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  getAllSongs(): Observable<any> {
    return super.get('songs/');
  }

  updateSong(id: string, payload: any): Observable<any> {
    return super.put(`songs/${id}`, payload);
  }

  postSong(payload: any): Observable<any> {
    return super.post('songs/', payload);
  }

  deleteSong(id: string): Observable<any> {
    return super.delete(`songs/${id}`);
  }
}
