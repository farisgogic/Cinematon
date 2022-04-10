import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

Injectable({
    providedIn: 'root'
})

export class RezervacijaService{
    private apiURL=environment + '/rezervacija';
    constructor(private http:HttpClient) {}

}