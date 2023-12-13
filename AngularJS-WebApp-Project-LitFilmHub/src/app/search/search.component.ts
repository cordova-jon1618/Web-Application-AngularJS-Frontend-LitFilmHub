
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/book-detail/book';
import { Film } from 'src/app/film-detail/film';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  books: Book[] = [];
  films: Film[] = [];

  constructor(private http: HttpClient) {
    this.fetchBooks();
    this.fetchFilms();
  }

  // fetchData() {
  //   this.fetchBooks();
  //   this.fetchFilms();
  // }

  fetchBooks() {
    this.http.get<Book[]>(environment.baseUrl + '/api/book/book-detail').subscribe({
      next: (result) => {
        this.books = result;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  fetchFilms() {
    this.http.get<Film[]>(environment.baseUrl + '/api/film/film-detail').subscribe({
      next: (result) => {
        this.films = result;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
      }
    });
  }
}
