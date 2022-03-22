import {Component, Input, OnInit, Output} from '@angular/core';
import {VisestrukiOdabirModel} from "./visestruki-odabir-model";

@Component({
  selector: 'app-visestruki-odabir',
  templateUrl: './visestruki-odabir.component.html',
  styleUrls: ['./visestruki-odabir.component.css']
})
export class VisestrukiOdabirComponent implements OnInit {

  constructor() { }

  @Input()
  SelectedItems: VisestrukiOdabirModel[]=[];

  @Input()
  NonSelectedItems: VisestrukiOdabirModel[]=[];

  ngOnInit(): void {
  }

  select(item: VisestrukiOdabirModel, index: number){
    this.SelectedItems.push(item);
    this.NonSelectedItems.splice(index,1);
  }

  deselect(item: VisestrukiOdabirModel, index: number){
    this.NonSelectedItems.push(item);
    this.SelectedItems.splice(index,1);
  }

  izaberiSve(){
    this.SelectedItems.push(...this.NonSelectedItems);
    this.NonSelectedItems=[];
  }

  ukloniSve(){
    this.NonSelectedItems.push(...this.SelectedItems);
    this.SelectedItems=[];
  }

}
