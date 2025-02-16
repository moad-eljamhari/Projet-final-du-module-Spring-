// NotificationService
import { Injectable } from '@angular/core';
import { Client } from '@stomp/stompjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient!: Client;
  private notificationSubject: Observable<string>; // Keep it private
  private serverUrl = 'ws://mimo:61614'; // Updated URL for your WebSocket endpoint

  constructor() {
    this.notificationSubject = new Observable<string>((observer) => {
      this.stompClient = new Client({
        brokerURL: this.serverUrl,
        connectHeaders: {
          login: 'user',
          passcode: 'password'
        },
        debug: (str) => {
          console.log(str);
        },
        reconnectDelay: 5000,
        onConnect: (frame) => {
          console.log('Connected to WebSocket');
          this.stompClient.subscribe('/topic/notifications', (message) => {
            observer.next(message.body);
          });
        },
        onStompError: (frame) => {
          console.error('Error connecting to WebSocket:', frame);
        }
      });
      this.stompClient.activate();
    });
  }

  // Getter for notificationSubject
  get notifications(): Observable<string> {
    return this.notificationSubject;
  }

  sendMessage(message: string): void {
    this.stompClient.publish({
      destination: '/app/sendNotification',
      body: message
    });
  }
}
