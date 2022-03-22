import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { PrvoSlovo } from 'src/app/validators/PrvoSlovo';
import {ZanrCreationDTO, zanrDTO} from "../zanr.model";

@Component({
  selector: 'app-form-zanr',
  templateUrl: './form-zanr.component.html',
  styleUrls: ['./form-zanr.component.css']
})
export class FormZanrComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input()
  model!: ZanrCreationDTO;

  form!: FormGroup;

  @Output() onSaveChanges = new EventEmitter<ZanrCreationDTO>();

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      naziv: ["",{
        validators:[Validators.required,Validators.minLength(3), PrvoSlovo()]
      }]
    });

    if(this.model!== undefined){
      this.form.patchValue(this.model);
    }

  }

  SaveChanges(){
    this.onSaveChanges.emit(this.form.value);
  }

  getErrorMessageFieldName(){
    const field=this.form.get('naziv');

    if(field?.hasError('required')){
      return 'Ovo polje je obavezno';
    }

    if(field?.hasError('minlength')){
      return 'Unesite minimalno 3 karaktera';
    }

    if(field?.hasError('PrvoSlovo')){
      return field?.getError('PrvoSlovo').message;
    }

    return '';
  }

}
