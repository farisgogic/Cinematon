import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FilmoviPutGetDTO, movieCreationDTO, movieDTO} from "../movies.model";
import {MoviesService} from "../movies.service";
import {VisestrukiOdabirModel} from "../../utilities/visestruki-odabir/visestruki-odabir-model";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  constructor(private activatedRouted: ActivatedRoute, private moviesService:MoviesService,
              private router:Router) { }

  model!:movieDTO;
  selectedZanr!: VisestrukiOdabirModel[];
  nonSelectedZanr!: VisestrukiOdabirModel[];

  selectedSala!: VisestrukiOdabirModel[];
  nonSelectedSala!: VisestrukiOdabirModel[];

  showEdit=false;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      this.moviesService.putGet(params['id']).subscribe((putGetDTO:FilmoviPutGetDTO) => {
        this.model = putGetDTO.filmovi;

        this.selectedZanr = putGetDTO.selectedZanr.map(zanrDTO => {
          return <VisestrukiOdabirModel>({key:zanrDTO.id, value: zanrDTO.naziv});
        });

        this.nonSelectedZanr = putGetDTO.nonSelectedZanr.map(zanrDTO => {
          return <VisestrukiOdabirModel>({key:zanrDTO.id, value: zanrDTO.naziv});
        });

        this.selectedSala = putGetDTO.selectedSala.map(salaDTO => {
          return <VisestrukiOdabirModel>({key:salaDTO.id, value: salaDTO.ime});
        });

        this.nonSelectedSala = putGetDTO.nonSelectedSala.map(salaDTO => {
          return <VisestrukiOdabirModel>({key:salaDTO.id, value: salaDTO.ime});
        });
      });
    });
  }

  SaveChanges(movieCreationDTO: movieCreationDTO){
    this.moviesService.edit(this.model.id, movieCreationDTO).subscribe(()=>{
      this.router.navigate(['/movies/'+this.model.id]);
    });
  }

  edit(){
    this.showEdit=true;
  }
}
