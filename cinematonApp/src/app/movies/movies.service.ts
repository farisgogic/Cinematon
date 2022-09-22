import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {FilmoviPostGetDTO, FilmoviPutGetDTO, movieCreationDTO, movieDTO, PocetnaDTO} from "./movies.model";
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiURL= 'https://webapi20220920183854.azurewebsites.net/api/Filmovi';
  constructor(private http:HttpClient) { }

  postGet():Observable<FilmoviPostGetDTO>{
    return this.http.get<FilmoviPostGetDTO>(this.apiURL+'/PostGet');
  }

  get():Observable<movieDTO[]>{
    return this.http.get<movieDTO[]>(this.apiURL);

  }

  public create(movie:movieCreationDTO):Observable<number>{
    const formData=this.BuildFormData(movie);
    return this.http.post<number>(this.apiURL,formData);
  }

  delete(id:number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  private BuildFormData(movie:movieCreationDTO):FormData{
    const formData=new FormData();

    formData.append('Naslov', movie.Naslov);

    formData.append('Cijena', movie.Cijena.toString());


    if(movie.Poster) {
      formData.append('Poster', movie.Poster);
    }

    formData.append('Opis', movie.Opis);
    formData.append('Trailer', movie.Trailer);
    formData.append('naProgramu', String(movie.naProgramu));
    formData.append('uskoro', String(movie.uskoro));

    function convert(str: any){
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    if(movie.Datum) {
      formData.append('Datum', convert(movie.Datum));
    }

    formData.append('FilmoviZanr', JSON.stringify(movie.FilmoviZanr));
    formData.append('SalaId', JSON.stringify(movie.SalaId));

    return formData;
  }
  
  public getById(id:number):Observable<movieDTO>{
    return this.http.get<movieDTO>(`${this.apiURL}/${id}`);
  }

  public getPocetnaFilmovi():Observable<movieDTO>{
    return this.http.get<movieDTO>(this.apiURL);
  }
  
  public putGet(id:number):Observable<FilmoviPutGetDTO>{
    return this.http.get<FilmoviPutGetDTO>(`${this.apiURL}/update/${id}`);
  }

  public edit(id:number, filmoviCreationDTO: movieCreationDTO){
    const formdata=this.BuildFormData(filmoviCreationDTO);
    return this.http.put(`${this.apiURL}/${id}`, formdata);
  }

  public filter(values:any):Observable<any>{
    const params=new HttpParams({fromObject:values});
    return this.http.get<movieDTO[]>(`${this.apiURL}/filter`, {params, observe:'response'});
  }
}
