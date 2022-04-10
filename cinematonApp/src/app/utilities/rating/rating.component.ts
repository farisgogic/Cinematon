import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SecurityService} from "../../security/security.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor(private securityService:SecurityService) { }

  @Input()
  maxRating=5;
  @Input()
  selectedRate=0;
  @Output()
  onRating: EventEmitter<number> = new EventEmitter<number>();
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
    if(this.securityService.isAuthenticated()) {
      this.selectedRate = index + 1;
      this.ProslaOcjena = this.selectedRate;
      this.onRating.emit(this.selectedRate);
    }else{
      Swal.fire("Greska", "Morate biti prijavljeni!", "error");
    }
  }

}
