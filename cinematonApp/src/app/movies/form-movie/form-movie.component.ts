import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {movieCreationDTO, movieDTO} from '../movies.model';
import {VisestrukiOdabirModel} from "../../utilities/visestruki-odabir/visestruki-odabir-model";

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  @Input() model!: movieDTO;

  form!: FormGroup

  @Output()
  onSaveChanges=new EventEmitter<movieCreationDTO>();

  @Input() NonSelectedZanr:VisestrukiOdabirModel[]=[];
  @Input() SelectedZanr:VisestrukiOdabirModel[]=[];

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      Naslov:['',{
        validators: [Validators.required]
      }],
      Opis:'',
      naProgramu:false,
      uskoro:false,
      Trailer:'',
      Datum:'',
      Poster:'',
      FilmoviZanr:[],
      Cijena:''
    });

    if(this.model !== undefined){
      this.form.patchValue(this.model);
    }
    this.form.get('Naslov')?.patchValue(this.model.naslov);
    this.form.get('Trailer')?.patchValue(this.model.trailer);
    this.form.get('Datum')?.patchValue(this.model.datum);
    this.form.get('Opis')?.patchValue(this.model.opis);
    this.form.get('Cijena')?.patchValue(this.model.cijena);
  }

  SaveChanges(){
    const zanrID=this.SelectedZanr.map(value => value.key);
    this.form.get('FilmoviZanr')?.setValue(zanrID);
    this.onSaveChanges.emit(this.form.value);
  }

  onImageSelected(file:File){
    this.form.get('Poster')?.setValue(file);
  }

  changeMarkdown(content:any){
    this.form.get('Opis')?.setValue(content.target.value);
  }

}
