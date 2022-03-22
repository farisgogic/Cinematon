import { Component, OnInit } from '@angular/core';
import {FilmoviPostGetDTO, movieCreationDTO} from "../movies.model";
import {VisestrukiOdabirModel} from "../../utilities/visestruki-odabir/visestruki-odabir-model";
import {zanrDTO} from "../../zanr/zanr.model";
import {MoviesService} from "../movies.service";
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  NonSelectedZanr: VisestrukiOdabirModel[] = [];

  constructor(private moviesService:MoviesService) { }


  ngOnInit(): void {
    this.moviesService.postGet().subscribe((response:FilmoviPostGetDTO) => {
      this.NonSelectedZanr = response.Zanr.map((zanr: zanrDTO) => {
        return <VisestrukiOdabirModel>({key:zanr.Id, value: zanr.Naziv});
      });
    });
  }

  saveChanges(movieCreationDTO:movieCreationDTO){
    console.log(movieCreationDTO);
  }

}
