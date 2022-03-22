import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  zanrovi=[{id:1, name: 'Drama'}, {id:2, name: 'Akcija'}, {id:3, name: 'Fantazija'},{id:4, name: 'Mjuzikl'}];

  form!: FormGroup;

  movies=[
    {naziv: 'Spider-Man', poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UY720_.jpg'},
    {naziv: 'Outside the wire', poster: 'https://m.media-amazon.com/images/M/MV5BNmM2MWQ0NzktNzU0OS00MjYzLTkxNDYtMzliNTA5ZmNkMmZlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1200_.jpg'},
    {naziv: 'Moana', poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_FMjpg_UX1086_.jpg'}
  ];

  originalFilmovi=this.movies;

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      naziv: '',
      zanrID: 0,
      uskoro: false,
      naProgramu: false
    });

    this.form.valueChanges.subscribe(value => {
      this.movies=this.originalFilmovi;
      this.filterFilmova(value);
    });
  }

  filterFilmova(values:any){
    if(values.naziv){
      this.movies=this.movies.filter(movie=>movie.naziv.indexOf(values.naziv)!==-1);

    }
  }
  ResetForme(){
    this.form.reset();
  }

}
