import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ZanrCreationDTO, zanrDTO} from "../zanr.model";
import {ZanrService} from "../zanr.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-zanr',
  templateUrl: './edit-zanr.component.html',
  styleUrls: ['./edit-zanr.component.css']
})
export class EditZanrComponent implements OnInit {

  constructor(private activatedRouted: ActivatedRoute,
              private zanrService:ZanrService,
              private router:Router) { }

  model!: zanrDTO;

  ngOnInit(): void {
    this.activatedRouted.params.subscribe(params => {
      this.zanrService.GetById(params['id']).subscribe((zanr:any)=>{
        this.model=zanr;
      })
    });


  }

  SaveChanges(zanr: ZanrCreationDTO){
    this.zanrService.edit(zanr, this.model.id).subscribe(()=>{
      this.router.navigate(["/zanr"]);
    });
  }
}
