

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { MemberComponent } from './member/member.component';
import { DiscussionComponent } from './discussion/discussion.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
{ path: '', component: HomeComponent, pathMatch: 'full' },
{ path: 'search', component: SearchComponent },
{ path: 'book-detail', component: BookDetailComponent },
{ path: 'film-detail', component: FilmDetailComponent },
{ path: 'login', component: LoginComponent },
{ path: 'member', component: MemberComponent },
{ path: 'discussion', component: DiscussionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }