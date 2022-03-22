import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {movieCreationDTO, movieDTO} from "../movies.model";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRouted: ActivatedRoute) { }

  model:movieDTO={Naslov:'Spider-Man', naProgramu:true, uskoro:false, Opis:"....", Datum:new Date(),
    Trailer:'.......', Poster:'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_FMjpg_UY720_.jpg'
  }
  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {

    });
  }

  SaveChanges(movieCreationDTO: movieCreationDTO){

  }
}
