import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'cinematonApp';

  handleRating(){

    alert('Uspjesno ste ocijenili film');
  }

}

