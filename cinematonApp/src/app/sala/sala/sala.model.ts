import { Sjediste } from "src/app/rezervacija/rezervacija.model";

export interface salaCreationDTO{
    ime:string;
}

export interface salaDTO{
    id: number;
    ime:string;
    Sjedista: Sjediste; 
}