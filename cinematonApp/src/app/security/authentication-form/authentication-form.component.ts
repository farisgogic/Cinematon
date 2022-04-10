import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {KorisnickiPodaci} from "../security.model";

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {

  constructor(private formBuilder:FormBuilder) { }

  form!:FormGroup;

  @Input() action:string = 'Registracija';

  @Output() onSubmit = new EventEmitter<KorisnickiPodaci>();

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      lozinka: ['', {
        validators: [Validators.required]
      }]
    });
  }

  getEmailError(){
    var polje=this.form.get('email');

    if(polje?.hasError('email')){
      return "Pogresan email!";
    }

    if(polje?.hasError('required')){
      return "Polje email je obavezno"
    }

    return '';
  }

}
