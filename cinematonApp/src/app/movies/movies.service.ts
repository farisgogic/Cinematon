import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {FilmoviPostGetDTO} from "./movies.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiURL=environment.apiURL+'/Filmovi';
  constructor(private http:HttpClient) { }

  postGet():Observable<FilmoviPostGetDTO>{
    return this.http.get<FilmoviPostGetDTO>(this.apiURL+'/PostGet');
  }
}
