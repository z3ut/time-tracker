import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private behaviorSubject = new BehaviorSubject(false);

  isVisible = this.behaviorSubject.asObservable();

  constructor() { }

  show() {
    this.behaviorSubject.next(true);
  }

  hide() {
    this.behaviorSubject.next(false);
  }

}
