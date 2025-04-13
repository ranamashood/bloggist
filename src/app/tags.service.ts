import { Injectable } from '@angular/core';
import { Tag } from './tag.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<Tag[]>('/api/tags');
  }

  getAllNames() {
    return this.http.get<{ name: string }[]>('/api/tags/names');
  }
}
