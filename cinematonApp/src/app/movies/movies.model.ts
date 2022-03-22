import { zanrDTO } from "../zanr/zanr.model";

export interface movieCreationDTO{
  Naslov: string;
  Opis: any;
  Poster: File;
  naProgramu:boolean;
  uskoro:boolean;
  Datum: Date;
  Trailer: string;
  ZanrId: number[];
}

export interface movieDTO{
  Naslov: string;
  Opis: any;
  Poster: string;
  naProgramu:boolean;
  uskoro:boolean;
  Datum: Date;
  Trailer: string;
}

export interface FilmoviPostGetDTO{
  Zanr: zanrDTO[];
}

