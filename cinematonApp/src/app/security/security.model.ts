export  interface KorisnickiPodaci{
    email:string;
    lozinka:string;
}

export interface authenticationResponse{
    token:string;
    datumIsteka:Date;
}

export interface KorisniciDTO{
    id:string;
    email:string;
}