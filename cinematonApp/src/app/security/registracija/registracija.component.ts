import { Component, OnInit } from '@angular/core';
import {KorisnickiPodaci} from "../security.model";
import {SecurityService} from "../security.service";
import {parseWebAPIErrors} from "../../utilities/utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private securityService:SecurityService, private router:Router) { }

  errors:string[]=[];

  ngOnInit(): void {
  }

  registracija(podaci: KorisnickiPodaci){
    this.errors=[];
    this.securityService.registracija(podaci).subscribe(response=>{
      this.securityService.snimiToken(response);
      this.router.navigate(['/']);
    }, error => this.errors=parseWebAPIErrors(error));
  }

}
