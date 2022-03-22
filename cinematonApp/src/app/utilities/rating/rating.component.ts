import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor() { }

  @Input()
  maxRating=5;
  @Input()
  selectedRate=0;
  @Output()
  onRating: EventEmitter<void> = new EventEmitter<void>();
  ProslaOcjena=0;
  maxRatingNiz:any=[];
  ngOnInit(): void {
    this.maxRatingNiz=Array(this.maxRating).fill(0);
  }
  handleMouseEnter(index:number){
    this.selectedRate=index+1;
  }
  handleMouseLeave() {
    if (this.ProslaOcjena !== 0) {
      this.selectedRate = this.ProslaOcjena;
    } else {
      this.selectedRate = 0;
    }
  }
  ocijeni(index:number){
    this.selectedRate=index+1;
    this.ProslaOcjena=this.selectedRate;
    this.onRating.emit();
  }

}
