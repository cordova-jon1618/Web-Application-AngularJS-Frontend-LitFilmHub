import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar"; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BookDetailComponent,
    FilmDetailComponent,
    SearchComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,


    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule 


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
