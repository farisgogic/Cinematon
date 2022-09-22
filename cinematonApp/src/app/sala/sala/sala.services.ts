import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'
import { movieCreationDTO } from 'src/app/movies/movies.model';
import { environment } from 'src/environments/environment';
import { salaCreationDTO, salaDTO } from './sala.model';
import {Observable} from "rxjs";


@Injectable({
    providedIn:'root'
})

export class SalaService{
    apiURL='https://webapi20220920183854.azurewebsites.net/api/Sala';
    constructor(private http:HttpClient){}

    create(sala:salaCreationDTO){
        return this.http.post(this.apiURL, sala);
    }

    delete(id:number){
        return this.http.delete(
            `${this.apiURL}/${id}`
        );
    }

    get():Observable<salaDTO[]>{
        return this.http.get<salaDTO[]>(
            `${this.apiURL}`
        );
    }

    GetById(id:number):Observable<salaDTO>{
        return this.http.get<salaDTO>(
            `${this.apiURL}/${id}`
        );
    }
}