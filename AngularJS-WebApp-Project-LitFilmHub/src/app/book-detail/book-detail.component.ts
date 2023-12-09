
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

  constructor(private http: HttpClient) {
    this.http.get<Book[]>(environment.baseUrl + '/api/book-detail').subscribe({
      next: (result) => {
        this.books = result;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }
}

