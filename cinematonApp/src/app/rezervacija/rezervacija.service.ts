import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Sjediste, SjedisteDTO} from "./rezervacija.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RezervacijaService{
    private apiURL='https://webapi20220920183854.azurewebsites.net/api/Sjediste';
    constructor(private http:HttpClient) {}

  GetAll(): Observable<Sjediste[]>{
    return this.http.get<Sjediste[]>('https://webapi20220920183854.azurewebsites.net/api/Sjediste');
  }

  GetById(id:number){
    return this.http.get(`${this.apiURL}/${id}`);
  }

  update(id:number, sjediste:SjedisteDTO){
    return this.http.patch(`${this.apiURL}/${id}`, sjediste);
  }
}
