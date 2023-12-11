import { Component } from '@angular/core';
import { Book } from './book';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})

export class BookDetailComponent {
  books: Book[] = [];
  currentIndex = 0;

  constructor(private http: HttpClient) {
    this.http.get<Book[]>(environment.baseUrl + '/api/book/book-detail').subscribe({
      next: (result) => {
        this.books = result;
        this.currentIndex = 0;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }//end constructor

  onNextClick() {
    if (this.books.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.books.length;
    }
  }

  get currentBook() {
    return this.books.length > 0 ? this.books[this.currentIndex] : null;
  }
}

