import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rezervacija',
  templateUrl: './rezervacija.component.html',
  styleUrls: ['./rezervacija.component.css']
})
export class RezervacijaComponent implements OnInit {

  sa:any[]=['jedan', 'dva', 'tri'];

  red:number[]=[];
  kolona:number[]=[];

  constructor() { }

  ngOnInit(): void {
  }

}
