import { Component, OnDestroy, OnInit } from '@angular/core';
import { Discussion } from './discussion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { AuthService } from '../login/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})

export class DiscussionComponent {
  discussions: Discussion[] = [];
  currentIndex = 0; 
  isLoggedIn = false;
  message: string = '';
  private destroySubject = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) {
    // Subscribe to the auth status
    this.authService.authStatus.pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedIn = result;

      // Fetch discussions only when the user is logged in
      if (this.isLoggedIn) {
        this.fetchDiscussions();
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenicated(); // Ensure the method name matches your AuthService
    if (this.isLoggedIn) {
      this.fetchDiscussions();
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  fetchDiscussions() {
    this.http.get<Discussion[]>(environment.baseUrl + '/api/discussion').subscribe({
      next: (result) => {
        this.discussions = result;
        this.currentIndex = 0;
      },
      error: (error) => {
        console.error('Error fetching discussions:', error);
      }
    });
  }

  // sendMessage(message: string) {
  //   console.log('Message to send:', message);
  //   // Add logic to handle sending the message
  //   // Reset the message input after sending
  //   this.message = '';
  // }

  sendMessage(message: string) {
    // Check if the message is empty before sending
    if (message.trim() === '') {
      console.log('Message is empty. Not sending.');
      return;
    }
  
    console.log('Message to send:', message);
  
    // Send the message to the backend
    this.http.post(environment.baseUrl + '/api/discussion/addMessage', JSON.stringify(message), {
      headers: {
        'Content-Type': 'application/json'
      }
    }).subscribe({
      next: () => {
        console.log('Message sent successfully');
        // Optionally, you can fetch discussions again to refresh the list
        this.fetchDiscussions();
      },
      error: (error) => {
        console.error('Error sending message:', error);
      }
    });
  }
  
  // onNextClick() {
  //   console.log("Discussion length: ", this.discussions.length);
  //   if (this.discussions.length > 0) {
  //     this.currentIndex = (this.currentIndex + 1) % this.discussions.length;
  //     console.log("Discussion index: ", this.currentIndex);
  //   }
  // }

  get currentDiscussion() {
    return this.discussions.length > 0 ? this.discussions[this.currentIndex] : null;
  }

}

