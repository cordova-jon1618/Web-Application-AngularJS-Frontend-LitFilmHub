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

  constructor(private http: HttpClient) {
    this.http.get<Film[]>(environment.baseUrl + '/api/film-detail').subscribe({
      next: (result) => {
        this.films = result;
      },
      error: (error) => {
        console.error('Error fetching films:', error);
      }
    });
  }
}

