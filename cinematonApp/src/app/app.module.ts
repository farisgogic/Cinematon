import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { GenericListComponent } from './utilities/generic-list/generic-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MarkdownModule} from 'ngx-markdown'

import {MaterialModule} from './material/material.module';
import { MenuComponent } from './menu/menu.component';
import { RatingComponent } from './utilities/rating/rating.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZanrComponent } from './zanr/zanr.component';
import { NapraviNoviComponent } from './zanr/napravi-novi/napravi-novi.component';
import { CreateMovieComponent } from './movies/create-movie/create-movie.component';
import { EditMovieComponent } from './movies/edit-movie/edit-movie.component';
import { EditZanrComponent } from './zanr/edit-zanr/edit-zanr.component';
import { FormZanrComponent } from './zanr/form-zanr/form-zanr.component';
import { MovieFilterComponent } from './movies/movie-filter/movie-filter.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { FormMovieComponent } from './movies/form-movie/form-movie.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { InputImgComponent } from './utilities/input-img/input-img.component';
import { InputMarkdownComponent } from './utilities/input-markdown/input-markdown.component';
import {RouterModule} from "@angular/router";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";
import { VisestrukiOdabirComponent } from './utilities/visestruki-odabir/visestruki-odabir.component';
import { DisplayErrorsComponent } from './utilities/display-errors/display-errors.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    GenericListComponent,
    MenuComponent,
    RatingComponent,
    PocetnaComponent,
    ZanrComponent,
    NapraviNoviComponent,
    CreateMovieComponent,
    EditMovieComponent,
    EditZanrComponent,
    FormZanrComponent,
    MovieFilterComponent,
    KontaktComponent,
    FormMovieComponent,
    InputImgComponent,
    InputMarkdownComponent,
    VisestrukiOdabirComponent,
    DisplayErrorsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        FormsModule,
        MarkdownModule.forRoot(),
        RouterModule,
        HttpClientModule,
        MatNativeDateModule,
        MatTableModule,
      SweetAlert2Module.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
