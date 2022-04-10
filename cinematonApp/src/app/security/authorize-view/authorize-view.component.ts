import { Component, OnInit, Input } from '@angular/core';
import {SecurityService} from "../security.service";

@Component({
  selector: 'app-authorize-view',
  templateUrl: './authorize-view.component.html',
  styleUrls: ['./authorize-view.component.css']
})
export class AuthorizeViewComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  ngOnInit(): void {
  }

  @Input() uloga: any;

  public isAuthorized(){
    if(this.uloga){
      return this.securityService.getUloga()===this.uloga;
    }else{
      return this.securityService.isAuthenticated();
    }
  }
}
