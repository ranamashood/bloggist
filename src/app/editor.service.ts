import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  private contentSubject = new BehaviorSubject<string>('');
  // public content = this.contentSubject.asObservable();

  constructor() {}

  setContent(content: string) {
    this.contentSubject.next(content);
  }

  getContent(): string {
    return this.contentSubject.value;
  }
}
