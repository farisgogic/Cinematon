import { zanrDTO } from "../zanr/zanr.model";

export interface movieCreationDTO{
  Naslov: string;
  Opis: string;
  Poster: File;
  naProgramu:boolean;
  uskoro:boolean;
  Datum: Date;
  Trailer: string;
  FilmoviZanr: number[];
  Cijena: number;
}

export interface movieDTO{
  id:number;
  naslov: string;
  opis: any;
  poster: string;
  naProgramu:boolean;
  uskoro:boolean;
  datum: Date;
  trailer: string;
  zanr:zanrDTO[];
  prosjecnaOcjena:number;
  korisnickaOcjena:number;
  cijena: number;
}

export interface FilmoviPostGetDTO{
  zanr: zanrDTO[];
}

export interface PocetnaDTO{
  uskoro:movieDTO[];
  naProgramu:movieDTO[];
}

export interface FilmoviPutGetDTO{
  filmovi: movieDTO;
  selectedZanr:zanrDTO[];
  nonSelectedZanr:zanrDTO[];
}
