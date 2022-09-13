import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Sjediste, SjedisteDTO} from "./rezervacija.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class RezervacijaService{
    private apiURL=environment + '/Sjediste';
    constructor(private http:HttpClient) {}

  GetAll(): Observable<Sjediste[]>{
      return this.http.get<Sjediste[]>(
        'https://localhost:44383/api/Sjediste'
      );
  }

  GetById(id:number){
    return this.http.get(
      'https://localhost:44383/api/Sjediste/'+id
    );
  }

  update(id:number, sjediste:SjedisteDTO){
    return this.http.patch(
      'https://localhost:44383/api/Sjediste/' + id, sjediste
    );
  }
}
