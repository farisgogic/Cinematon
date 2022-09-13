import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../movies/movies.service";

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{

  constructor(private movieService:MoviesService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.movieService.getPocetnaFilmovi().subscribe(pocetnaDTO=>{
      this.FilmoviNaProgramu=pocetnaDTO.naProgramu;
    })
  }

  FilmoviNaProgramu:any;

  onDelete(){
    this.loadData();
  }
}
