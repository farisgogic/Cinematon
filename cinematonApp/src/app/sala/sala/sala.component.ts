import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { salaCreationDTO, salaDTO } from './sala.model';
import { SalaService } from './sala.services';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {
  form!:FormGroup;
  sala!:salaDTO[];
  displayColumns=['ime', 'opcije'];
  showModal=false;

  @Output() onSaveChanges = new EventEmitter<salaCreationDTO>();

  constructor(private fb:FormBuilder, private salaService:SalaService) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      ime: ['', {
        validators: [Validators.required]
      }]
    })

    this.loadData();
  }

  loadData(){
    this.salaService.get().subscribe((x:salaDTO[])=>{
      this.sala=x;
    });
  }

  saveChanges(){
    this.onSaveChanges.emit(this.form.value);
    this.loadData();
  }

  delete(id:number){
    this.salaService.delete(id).subscribe(()=>{
      this.loadData();
    });
  } 

  dodaj(){
    this.showModal=true;
  }

  DodajSalu(sala:any){
    console.log("uslo")
    this.salaService.create(sala).subscribe(()=>{
      this.showModal=false;
      this.loadData();
    });
  }
}
