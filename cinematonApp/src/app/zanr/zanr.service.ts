import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ZanrCreationDTO, zanrDTO} from "./zanr.model";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZanrService {
  private apiURL='https://webapi20220920183854.azurewebsites.net/api/zanr'
  constructor(private _http:HttpClient) { }

  GetAllZanr(): Observable<zanrDTO[]>{
    return this._http.get<zanrDTO[]>(this.apiURL);
  }

  create(zanr: ZanrCreationDTO): Observable<ZanrCreationDTO>{
    return this._http.post<ZanrCreationDTO>(this.apiURL, zanr);
  }

  GetById(id:number): Observable<zanrDTO>{
    return this._http.get<zanrDTO>(`${this.apiURL}/${id}`);
  }

  edit(zanr:ZanrCreationDTO, id:number){
    return this._http.put(`${this.apiURL}/${id}`,zanr);
  }

  delete(id:number){
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
