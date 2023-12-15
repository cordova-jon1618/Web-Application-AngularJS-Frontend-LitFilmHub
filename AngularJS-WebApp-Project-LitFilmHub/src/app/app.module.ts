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

import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthInterceptor } from './login/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MemberComponent } from './member/member.component';
import { DiscussionComponent } from './discussion/discussion.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BookDetailComponent,
    FilmDetailComponent,
    SearchComponent,
    LoginComponent,
    MemberComponent,
    DiscussionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule 

  ],
  providers: [    
    {
      provide: LocationStrategy,  
      useClass: HashLocationStrategy
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
