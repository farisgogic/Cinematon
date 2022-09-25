import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import {SecurityService} from "../security/security.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;

  constructor(public securityService:SecurityService) { }

  ngOnInit(): void {
  }

  
  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }
  
}
