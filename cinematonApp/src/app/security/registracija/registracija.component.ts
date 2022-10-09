import { Component, OnInit } from '@angular/core';
import {KorisniciDTO, KorisnickiPodaci} from "../security.model";
import {SecurityService} from "../security.service";
import {parseWebAPIErrors} from "../../utilities/utils";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {
  
  constructor(private securityService:SecurityService, private router:Router) { }

  errors:string[]=[];
  korisnici!:KorisniciDTO;
  ngOnInit(): void {
    
  }

  registracija(podaci: KorisnickiPodaci){
    this.errors=[];
    this.securityService.registracija(podaci).subscribe(response=>{
      this.securityService.snimiToken(response);
    }, error=>this.errors=parseWebAPIErrors(error));
    this.router.navigate(['/pocetna']);
    Swal.fire("Potvrda", "Potvrdite Vas email putem linka koji smo vam poslali putem emaila", "success");
  }
}
