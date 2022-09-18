import { Component, OnInit } from '@angular/core';
import {MoviesService} from "../movies.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {movieDTO} from "../movies.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {RatingService} from "../../utilities/rating.service";
import Swal from 'sweetalert2';
import { SecurityService } from 'src/app/security/security.service';

@Component({
  selector: 'app-movie-detalji',
  templateUrl: './movie-detalji.component.html',
  styleUrls: ['./movie-detalji.component.css']
})
export class MovieDetaljiComponent implements OnInit {

  movie!:movieDTO;
  datum!:Date;
  trailerURL!: SafeResourceUrl;

  constructor(private moviesService: MoviesService, private activatedRoute:ActivatedRoute
              , private sanitizer:DomSanitizer, private ratingService:RatingService
              ,private router:Router, private securityService:SecurityService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      this.moviesService.getById(params['id']).subscribe((movie:movieDTO)=>{
        this.movie=movie;
        this.datum=new Date(movie.datum);
        this.trailerURL=this.generateYTURL(movie.trailer);
      })
    })
  }
  

  generateYTURL(url:any): SafeResourceUrl{
    if(!url){
      return '';
    }
    let videoId=url.split('v=')[1];
    const aPosition=videoId.indexOf('&');
    if(aPosition !== '-1'){
      videoId=videoId.substring(0, aPosition);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
  }

  onRating(Ocjena: any){
    this.ratingService.ocjenaFilma(this.movie.id, Ocjena).subscribe(()=>{
      Swal.fire("Potvrda", "Uspjesno ste ocijenili film", "success");
    });
  }

  funkcija(){
    this.router.navigate(
      ['/rezervacija'],
      { queryParams: { id: this.movie.id } }
      );
  }
}
