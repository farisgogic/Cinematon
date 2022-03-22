import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit{
  ngOnInit(): void {
    this.FilmoviNaProgramu=[{
      Naslov:'Spider-Man: No way home',
      Datum: new Date(),
      poster: 'https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UY720_.jpg'
    },
      {
        Naslov:'Outside the wire',
        Datum: new Date(),
        poster: 'https://m.media-amazon.com/images/M/MV5BNmM2MWQ0NzktNzU0OS00MjYzLTkxNDYtMzliNTA5ZmNkMmZlXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_FMjpg_UX1200_.jpg'
      }];

    this.FilmoviUskoro = [];
  }
  FilmoviNaProgramu:any;
  FilmoviUskoro:any;

}
