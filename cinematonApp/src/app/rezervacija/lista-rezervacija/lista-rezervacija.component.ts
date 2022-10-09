import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieDTO } from 'src/app/movies/movies.model';
import { MoviesService } from 'src/app/movies/movies.service';
import { KorisniciDTO } from 'src/app/security/security.model';
import { SecurityService } from 'src/app/security/security.service';
import { Sjediste } from '../rezervacija.model';
import { RezervacijaService } from '../rezervacija.service';

@Component({
  selector: 'app-lista-rezervacija',
  templateUrl: './lista-rezervacija.component.html',
  styleUrls: ['./lista-rezervacija.component.css']
})
export class ListaRezervacijaComponent implements OnInit {

  sjediste!:Sjediste[];

  mySet = new Set();
  mySetFilmova = new Set();

  niz: any[]=[];

  movie!:movieDTO;

  brojac=0;

  constructor(private rezervacijaService: RezervacijaService, private moviesService:MoviesService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.loadReservation();
  }


  loadReservation(){
    this.rezervacijaService.GetAll().subscribe((x:Sjediste[])=>{
      this.sjediste=x;
      for (let item = 0; item < this.sjediste.length; item++) {
          if(this.sjediste[item].zauzeto && this.sjediste[item].filmoviId){
            this.mySet.add(this.sjediste[item].email);
            this.mySetFilmova.add(this.sjediste[item].filmoviId);
          }
      }
    });

  }
  listaRez(korisnik:any, id:any) {
    this.niz=[]
    for (let item = 0; item < this.sjediste.length; item++) {
      if(korisnik == this.sjediste[item].email && this.sjediste[item].zauzeto==true && this.sjediste[item].filmoviId == id )  {


          this.niz.push(this.sjediste[item].id);

      }
    }
    return this.niz
  }

  ucitajKorisnike(id:any){
    let mySetKorisnika:any = [];
    for (let index = 0; index < this.sjediste.length; index++){
      if(this.sjediste[index].filmoviId == id && this.provjeriSetKorisnika(this.sjediste[index].email, mySetKorisnika)==false){
        mySetKorisnika.push(this.sjediste[index].email);
      }
    }
    return mySetKorisnika;
  }

  provjeriSetKorisnika(email:any, set:any){
    let sadrzi=false;
    for (let index = 0; index < set.length; index++) {
      if(email==set[index]){
        sadrzi=true;
      }
    }
    return sadrzi;
  }
}
