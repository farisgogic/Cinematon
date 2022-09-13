import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { salaCreationDTO, salaDTO } from '../sala/sala.model';
import { SalaService } from '../sala/sala.services';

@Component({
  selector: 'app-dodaj-salu',
  templateUrl: './dodaj-salu.component.html',
  styleUrls: ['./dodaj-salu.component.css']
})
export class DodajSaluComponent implements OnInit {
  sala:any;
  @Output() closeModal=new EventEmitter<void>();
  form!:FormGroup;
  
  @Output() rezultat=new EventEmitter<{
    ime:salaCreationDTO
  }>();

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      ime:''
    });
  }


  close(){
    this.closeModal.emit();
  }

  onSubmit(){
    console.log(this.form.value)
    this.rezultat.emit(this.form.value);
  }
}
