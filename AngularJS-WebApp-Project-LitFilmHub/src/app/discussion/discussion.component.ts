import { Component } from '@angular/core';
import { Discussion } from './discussion';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})

export class DiscussionComponent {
  discussions: Discussion[] = [];
  currentIndex = 0;

  constructor(private http: HttpClient) {
    this.http.get<Discussion[]>(environment.baseUrl + '/api/discussion').subscribe({
      next: (result) => {
        this.discussions = result;
        this.currentIndex = 0;
      },
      error: (error) => {
        console.error('Error fetching discussions:', error);
      }
    });
  }//end constructor

  onNextClick() {
    console.log("Discussion length: ", this.discussions.length);
    if (this.discussions.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.discussions.length;
      console.log("Discussion index: ", this.currentIndex);
    }
  }

  get currentDiscussion() {
    return this.discussions.length > 0 ? this.discussions[this.currentIndex] : null;
  }
}

