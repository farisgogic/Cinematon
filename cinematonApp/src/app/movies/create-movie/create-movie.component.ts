import { Component, OnInit } from '@angular/core';
import {FilmoviPostGetDTO, movieCreationDTO} from "../movies.model";
import {VisestrukiOdabirModel} from "../../utilities/visestruki-odabir/visestruki-odabir-model";
import {zanrDTO} from "../../zanr/zanr.model";
import {MoviesService} from "../movies.service";
import {map} from 'rxjs/operators';
import {Router} from "@angular/router";
import { salaDTO } from 'src/app/sala/sala/sala.model';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {
  NonSelectedZanr: VisestrukiOdabirModel[]=[];
  NonSelectedSala: VisestrukiOdabirModel[]=[];

  showModal=false;

  constructor(private moviesService:MoviesService, private router:Router) { }


  ngOnInit(): void {
    this.moviesService.postGet().subscribe((response:FilmoviPostGetDTO) => {
      this.NonSelectedZanr = response.zanr.map((zanrDTO: zanrDTO) => {
        return <VisestrukiOdabirModel>({key:zanrDTO.id, value: zanrDTO.naziv});
      });

      this.NonSelectedSala = response.sala.map((salaDTO: salaDTO) => {
        return <VisestrukiOdabirModel>({key:salaDTO.id, value: salaDTO.ime});
      });
    });
  }

  saveChanges(movieCreationDTO:movieCreationDTO){
    this.moviesService.create(movieCreationDTO).subscribe(id => {
      this.router.navigate(['/movies/'+ id]);
    });
  }

  dodaj(){
    this.showModal=true;
  }

}
