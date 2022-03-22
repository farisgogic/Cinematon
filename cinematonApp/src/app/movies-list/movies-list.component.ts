import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor() { }

  ngOnInit():void {
  }

  @Input()
  movies:any;

  Obrisi(index: number){
    this.movies.splice(index,1);
  }
}
