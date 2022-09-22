import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http:HttpClient) { }

  private apiURL='https://webapi20220920183854.azurewebsites.net/api/OcjenaFilma';

  public ocjenaFilma(filmoviId:number, Ocjena:number){
    return this.http.post(this.apiURL, {filmoviId, Ocjena});
  }
}
