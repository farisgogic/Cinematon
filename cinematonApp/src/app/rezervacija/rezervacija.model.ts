export interface Sjediste{
    id:number;
    red:number;
    kolona:number;
    email:string;
    zauzeto:boolean;
    filmoviId:number;
    salaId:number;
}

export interface SjedisteDTO{
    zauzeto:boolean;
    email:string;
    filmoviId:number;
    salaId:any;
}
