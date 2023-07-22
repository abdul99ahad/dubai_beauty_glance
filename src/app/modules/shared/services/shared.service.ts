import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class SharedService {
  private eventEmitter: Subject<any> = new Subject<any>();

  emitEvent(data: any): void {
    this.eventEmitter.next(data);
  }

  getEvent(): Observable<any> {
    return this.eventEmitter.asObservable();
  }
}
