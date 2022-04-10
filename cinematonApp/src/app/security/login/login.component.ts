import { Component, OnInit } from '@angular/core';
import { KorisnickiPodaci } from '../security.model';
import {SecurityService} from "../security.service";
import {Router} from "@angular/router";
import {parseWebAPIErrors} from "../../utilities/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private securityService:SecurityService, private router: Router) { }

  errors:string[]=[];

  ngOnInit(): void {
  }

  login(podaci:KorisnickiPodaci){
    this.securityService.login(podaci).subscribe(response => {
      this.securityService.snimiToken(response);
      this.router.navigate(['/']);
    }, error=>this.errors=parseWebAPIErrors(error));
  }
}
