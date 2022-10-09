import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PocetnaComponent} from "./pocetna/pocetna.component";
import {ZanrComponent} from "./zanr/zanr.component";
import {NapraviNoviComponent} from "./zanr/napravi-novi/napravi-novi.component";
import {CreateMovieComponent} from "./movies/create-movie/create-movie.component";
import {EditZanrComponent} from "./zanr/edit-zanr/edit-zanr.component";
import {EditMovieComponent} from "./movies/edit-movie/edit-movie.component";
import {MovieFilterComponent} from "./movies/movie-filter/movie-filter.component";
import {MovieDetaljiComponent} from "./movies/movie-detalji/movie-detalji.component";
import {IsAdminGuard} from "./is-admin.guard";
import {LoginComponent} from "./security/login/login.component";
import {RegistracijaComponent} from "./security/registracija/registracija.component";
import {KorisnikIndexComponent} from "./security/korisnik-index/korisnik-index.component";
import {RezervacijaComponent} from "./rezervacija/rezervacija.component";
import { ListaRezervacijaComponent } from './rezervacija/lista-rezervacija/lista-rezervacija.component';
import { SalaComponent } from './sala/sala/sala.component';
import { DodajSaluComponent } from './sala/dodaj-salu/dodaj-salu.component';
import { IsUserGuard } from './is-user.guard';
import { ResetPasswordComponent } from './security/reset-password/reset-password.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { PotvrdaEmailaComponent } from './security/potvrda-emaila/potvrda-emaila.component';

const routes: Routes = [
  {path:'pocetna', component: PocetnaComponent},

  {path: 'zanr', component: ZanrComponent, canActivate:[IsAdminGuard]},
  {path: 'zanr/napraviNovi', component: NapraviNoviComponent, canActivate:[IsAdminGuard]},
  {path: 'zanr/edit/:id', component: EditZanrComponent, canActivate:[IsAdminGuard]},

  {path: 'movies/create', component: CreateMovieComponent, canActivate:[IsAdminGuard]},
  {path: 'movies/edit/:id', component: EditMovieComponent, canActivate:[IsAdminGuard]},
  {path: 'movies/filter', component: MovieFilterComponent},
  {path: 'movies/:id', component: MovieDetaljiComponent},

  {path: 'rezervacija', component: RezervacijaComponent, canActivate:[IsUserGuard]},

  {path: 'login', component: LoginComponent},
  {path: 'registracija', component: RegistracijaComponent},
  
  {path: 'resetpassword', component: ResetPasswordComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'potvrda-emaila', component: PotvrdaEmailaComponent},

  {path: 'korisnici', component: KorisnikIndexComponent, canActivate:[IsAdminGuard]},
  {path: 'lista-rezervacija', component: ListaRezervacijaComponent, canActivate:[IsAdminGuard]},
  {path: 'sala', component: SalaComponent, canActivate:[IsAdminGuard]},
  {path: 'sala/dodaj-salu', component: DodajSaluComponent, canActivate:[IsAdminGuard]},



  {path:'**',component: PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
