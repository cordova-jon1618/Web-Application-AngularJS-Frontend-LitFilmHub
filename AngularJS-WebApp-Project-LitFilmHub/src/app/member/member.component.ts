import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Member } from './member';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent {
    members: Member[] = [];
    currentIndex = 0;
  
    constructor(private http: HttpClient) {
      this.http.get<Member[]>(environment.baseUrl + '/api/member').subscribe({
        next: (result) => {
          this.members = result;
          this.currentIndex = 0;
        },
        error: (error) => {
          console.error('Error fetching members:', error);
        }
      });
    }//end constructor
  
    onNextClick() {
      if (this.members.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.members.length;
      }
    }
  
    get currentMember() {
      return this.members.length > 0 ? this.members[this.currentIndex] : null;
    }
  }
  
  