import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, GuardsCheckStart, Params, Route, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { movieDTO } from '../movies/movies.model';
import { MoviesService } from '../movies/movies.service';
import { salaDTO } from '../sala/sala/sala.model';
import { SecurityService } from '../security/security.service';
import { Sjediste, SjedisteDTO } from './rezervacija.model';
import {RezervacijaService} from "./rezervacija.service";




@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit{

  sjediste!:Sjediste[];

  refreshShedista = new BehaviorSubject<boolean>(true);

  movie!:movieDTO;

  filmid!:number;

  sala!:salaDTO;

  filter:any;

  cijena = 0;
  filter_student: string = '';
  check_student!: boolean;

  constructor(
    private rezervacijaService:RezervacijaService, 
    private securityService:SecurityService, 
    private moviesService:MoviesService,
    private route:ActivatedRoute,
  
    ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.filmid = params['id'];
    });

    this.getFilm();

    this.getSjediste();

  }
  
  filterPopust(){
    if(this.check_student){
      return this.movie.cijena - ((this.movie.cijena * 20)/100); 
    }
    return this.movie.cijena;
  }

  // loadData(){
  //   this.route.queryParams.subscribe(params => {
  //     this.filmid = params['id'];
  //   });

  //   this.getFilm();

  //   this.getSjediste();

  // } 

  getFilm(){
    this.moviesService.getById(this.filmid).subscribe((movie:movieDTO)=>{
      this.movie=movie;
      this.filter = this.sjediste.filter((x)=> x.salaId == this.movie.sala[0].id)  
    }); 
  }
  
  getSjediste(){
    this.rezervacijaService.GetAll().subscribe((x:Sjediste[])=>{
      this.sjediste=x;
      this.refreshShedista.pipe(switchMap(_ => this.rezervacijaService.GetAll()));
    });
  }
  
  zavrsi(){
    Swal.fire("Potvrda", `Sjedista su rezervisana, karte preuzmite na salteru. Ukupno za platiti ${this.cijena} KM`, "success");
    this.cijena=0;
  }

  rezervisi(id:number, sjediste:SjedisteDTO){
    this.rezervacijaService.update(id, sjediste).subscribe();
  }

  rez(id:number, sjediste:SjedisteDTO){
    this.rezervacijaService.GetById(id).subscribe((res:any)=>{
      if(res.zauzeto == false){
        sjediste.zauzeto=true;
        sjediste.email=this.securityService.getFieldFromJWT('email');
        sjediste.filmoviId= this.movie.id;
        sjediste.salaId=this.movie.sala[0].id;
        if(this.check_student){
          this.cijena += this.movie.cijena - ((this.movie.cijena * 20)/100); 
        }

        if(!this.check_student){
          this.cijena += this.movie.cijena; 
        }
  
      }
      
      else{
        if(this.securityService.getFieldFromJWT('email')==sjediste.email){
          sjediste.zauzeto=false;
          sjediste.email="";
          sjediste.filmoviId=0;
          sjediste.salaId=0;

          
          if(this.check_student){
            this.cijena = this.cijena + (this.movie.cijena * 20)/100; 
          }

          if(this.cijena>0){
            this.cijena-=this.movie.cijena;
          }

          if(this.cijena<0 || this.cijena==0){
            this.cijena=0;
          }

        }
        
        else{
          Swal.fire("Greska", "Ne mozete rezervisati vec rezervisano mjesto", "error");

        }
      }
      this.rezervisi(id, sjediste);
    });
  }

}
