import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ZanrCreationDTO, zanrDTO} from "../zanr.model";
import {ZanrService} from "../zanr.service";
import {parseWebAPIErrors} from "../../utilities/utils";

@Component({
  selector: 'app-napravi-novi',
  templateUrl: './napravi-novi.component.html',
  styleUrls: ['./napravi-novi.component.css']
})
export class NapraviNoviComponent implements OnInit {

  errors: String[]=[];

  constructor(private router: Router, private zanrService:ZanrService) { }


  ngOnInit(): void {
  }

  saveChanges(zanr: ZanrCreationDTO){
    this.zanrService.create(zanr).subscribe(() => {
      this.router.navigate(['/zanr']);
    }, error => this.errors=parseWebAPIErrors(error));
  }

}
