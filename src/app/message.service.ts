import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface Message {
  type: string;
  payload: any;
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<Message>();

  constructor() { }

  sendMessage(message: Message){
    this.subject.next(message);
  }

  getMessage(): Observable<Message>{
    return this.subject.asObservable();
  }
}
