import { Component, OnInit } from '@angular/core';
import { KorisniciDTO } from '../security.model';
import {SecurityService} from "../security.service";
import {HttpResponse} from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-korisnik-index',
  templateUrl: './korisnik-index.component.html',
  styleUrls: ['./korisnik-index.component.css']
})
export class KorisnikIndexComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  korisnici!:KorisniciDTO[] | null;
  stranica:number=1;
  zapisaPoStranici:number=10;
  ukupnoZapisa: any;
  kolone=["email", "Opcije"];

  ngOnInit(): void {
    this.securityService.getKorisnik(this.stranica,this.zapisaPoStranici)
        .subscribe((httpResponse: HttpResponse<KorisniciDTO[]>) => {
      this.korisnici=httpResponse.body;
      this.ukupnoZapisa=httpResponse.headers.get("ukupnoZapisa");

    });
  }

  dodajAdmin(korisnikId: string) {
    this.securityService.dodajAdmin(korisnikId).subscribe(()=>{
      Swal.fire("Potvrda", "Uspjesno ste dodijelili admina", "success");
    });
  }

  izbrisiAdmin(korisnikId: string) {
    this.securityService.izbrisiAdmin(korisnikId).subscribe(()=>{
      Swal.fire("Potvrda", "Uspjesno ste uklonili admina", "success");
    });
  }
}
