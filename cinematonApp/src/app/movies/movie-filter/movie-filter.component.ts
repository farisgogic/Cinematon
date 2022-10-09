import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { zanrDTO } from 'src/app/zanr/zanr.model';
import {MoviesService} from "../movies.service";
import {movieDTO} from "../movies.model";
import {ZanrService} from "../../zanr/zanr.service";
import {HttpResponse} from "@angular/common/http";
import {Location} from "@angular/common"
import {ActivatedRoute} from "@angular/router";
import * as moment from 'moment';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private moviesService:MoviesService, private zanrService:ZanrService,
              private location:Location, private activatedRoute:ActivatedRoute) { }

  zanrovi!: zanrDTO[];

  form!: FormGroup;

  movies!: movieDTO[] | null;

  inicijalneVrijednost:any;

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      naziv: '',
      zanrID: 0,
      datum: ''
    });
    this.inicijalneVrijednost=this.form.value;
    this.readParamaterFromURL();

    this.filter();
  }
  
  filter(){
    this.zanrService.GetAllZanr().subscribe(zanr=>{
      this.zanrovi=zanr;
  
      this.filterFilmova(this.form.value);
  
      this.form.valueChanges.subscribe(value => {
        this.filterFilmova(value);
        this.writeParamaterURL();
      });
    })
  }

  filterFilmova(values:any){
    this.moviesService.filter(values).subscribe((response:HttpResponse<movieDTO[]>)=>{
      this.movies=response.body;

    })
  }

  ResetForme(){
    this.form.patchValue(this.inicijalneVrijednost);
  }

  private readParamaterFromURL(){
    this.activatedRoute.queryParams.subscribe(params => {
      var obj:any={};

      if(params['naziv']){
        obj.naziv= params['naziv'];
      }

      if(params['zanrID']){
        obj.zanrID= Number(params['zanrID']);
      }


      if(params['datum']){
        obj.datum= params['datum'];
      }

      this.form.patchValue(obj);
    });
  }

  private writeParamaterURL(){
    const queryStrings=[];
    const formValues=this.form.value;
    if(formValues.naziv){
      queryStrings.push(`naziv=${formValues.naziv}`);
    }

    if(formValues.zanrID != '0'){
      queryStrings.push(`zanrID=${formValues.zanrID}`);
    }


    if(formValues.datum){
      queryStrings.push(`datum=${formValues.datum }`);
    }

    this.location.replaceState('movies/filter',queryStrings.join('&'));
  }

  onDelete(){
    this.filterFilmova(this.form.value);
  }

}