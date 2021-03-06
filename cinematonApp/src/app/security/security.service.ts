import { Injectable } from '@angular/core';
import {authenticationResponse, KorisniciDTO, KorisnickiPodaci} from "./security.model";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http:HttpClient) { }

  private apiURL=environment.apiURL+"/accounts";
  private readonly tokenKey:string='token';
  private readonly expirationTokenKey:string ='token-istice'
  private readonly roleField = 'role';

  getKorisnik(stranica: number, zapisiPoStranici:number): Observable<any>{
    let params=new HttpParams();
    params=params.append('stranica', stranica.toString());
    params=params.append('zapisiPoStranici', zapisiPoStranici.toString());
    return this.http.get<KorisniciDTO[]>(`${this.apiURL}/listKorisnik`, {observe: 'response', params});
  }

  dodajAdmin(korisnikId:string){
    const headers=new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/dodajAdmin`, JSON.stringify(korisnikId), {headers});
  }

  izbrisiAdmin(korisnikId:string){
    const headers=new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/izbrisiAdmin`, JSON.stringify(korisnikId), {headers});
  }

  isAuthenticated():boolean{
    const token=localStorage.getItem(this.tokenKey);
    if(!token)
      return false;

    const expiration = localStorage.getItem(this.expirationTokenKey);
    const datumIsticanja = new Date(expiration!);

    if(datumIsticanja<=new Date()){
      this.logout();
      return false;
    }
    return true;
  }

  getFieldFromJWT(field: string):string{
    const token=localStorage.getItem(this.tokenKey);
    if(!token){return '';}
    const dataToken=JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }

  getUloga():string{
    return this.getFieldFromJWT(this.roleField);
  }
  
  registracija(podaci:KorisnickiPodaci):Observable<authenticationResponse>{
    return this.http.post<authenticationResponse>(this.apiURL+ "/create", podaci);
  }

  login(podaci:KorisnickiPodaci):Observable<authenticationResponse>{
    return this.http.post<authenticationResponse>(this.apiURL+ "/login", podaci);
  }

  snimiToken(authenticationResponse: authenticationResponse){
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.datumIsteka.toString());
  }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }
}
