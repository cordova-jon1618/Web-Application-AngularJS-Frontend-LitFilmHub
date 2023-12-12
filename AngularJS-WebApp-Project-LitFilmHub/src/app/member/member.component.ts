import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Member } from './member';

import { AuthService } from '../login/auth.service';
import  { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})

export class MemberComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  currentIndex = 0;
  isLoggedIn: boolean = false;
  private destroySubject = new Subject();

  constructor(private http: HttpClient, private authService: AuthService) {
    // Subscribe to the auth status
    this.authService.authStatus.pipe(takeUntil(this.destroySubject))
    .subscribe(result => {
      this.isLoggedIn = result;

      // Fetch members only when the user is logged in
      if (this.isLoggedIn) {
        this.fetchMembers();
        console.log("Member should be fetched.")
      }
    });
  }//end constructor

    ngOnInit(): void {
      this.isLoggedIn = this.authService.isAuthenicated();
      if (this.isLoggedIn) {
        this.fetchMembers();
      }
    }

    ngOnDestroy(): void {
      this.destroySubject.next(true);
      this.destroySubject.complete();
    }

    fetchMembers() {
      this.http.get<Member[]>(environment.baseUrl + '/api/member').subscribe({
        next: (result) => {
          this.members = result;
          this.currentIndex = 0;
        },
        error: (error) => {
          console.error('Error fetching members:', error);
        }
      });
    }
    
    onNextClick() {
      if (this.members.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.members.length;
      }
    }
  
    get currentMember() {
      return this.members.length > 0 ? this.members[this.currentIndex] : null;
    }
  }
  
  