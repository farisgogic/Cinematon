import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PocetnaComponent} from "./pocetna/pocetna.component";
import {ZanrComponent} from "./zanr/zanr.component";
import {NapraviNoviComponent} from "./zanr/napravi-novi/napravi-novi.component";
import {CreateMovieComponent} from "./movies/create-movie/create-movie.component";
import {EditZanrComponent} from "./zanr/edit-zanr/edit-zanr.component";
import {EditMovieComponent} from "./movies/edit-movie/edit-movie.component";
import {MovieFilterComponent} from "./movies/movie-filter/movie-filter.component";
import {KontaktComponent} from "./kontakt/kontakt.component";

const routes: Routes = [
  {path:'pocetna', component: PocetnaComponent},

  {path: 'zanr', component: ZanrComponent},
  {path: 'zanr/napraviNovi', component: NapraviNoviComponent},
  {path: 'zanr/edit/:id', component: EditZanrComponent},

  {path: 'movies/create', component: CreateMovieComponent},
  {path: 'movies/edit/:id', component: EditMovieComponent},
  {path: 'movies/filter', component: MovieFilterComponent},

  {path: 'kontakt', component:KontaktComponent},

  {path:'**',component: PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
