import { Component, OnInit } from '@angular/core';
import {ZanrService} from "./zanr.service";
import {zanrDTO} from "./zanr.model";

@Component({
  selector: 'app-zanr',
  templateUrl: './zanr.component.html',
  styleUrls: ['./zanr.component.css']
})
export class ZanrComponent implements OnInit {

  zanr!: zanrDTO[];
  kolone=['Naziv', 'Opcije'];

  constructor(private zanrService: ZanrService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.zanrService.GetAllZanr().subscribe(zanr => {
      this.zanr=zanr;
    });
  }

  delete(id:number){
    this.zanrService.delete(id).subscribe(()=>{
      this.loadData();
    });
  }
}
