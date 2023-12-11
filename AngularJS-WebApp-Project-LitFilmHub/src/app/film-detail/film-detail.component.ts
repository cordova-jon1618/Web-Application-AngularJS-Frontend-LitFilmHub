import { Component } from '@angular/core';
import { Film } from './film';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})

export class FilmDetailComponent {
  films: Film[] = [];
  currentIndex = 0;

  constructor(private http: HttpClient) {
    this.http.get<Film[]>(environment.baseUrl + '/api/film/film-detail').subscribe({
      next: (result) => {
        this.films = result;
        this.currentIndex = 0;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
      }
    });
  }//end constructor

  onNextClick() {
    if (this.films.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.films.length;
    }
  }

  get currentFilm() {
    return this.films.length > 0 ? this.films[this.currentIndex] : null;
  }
}

