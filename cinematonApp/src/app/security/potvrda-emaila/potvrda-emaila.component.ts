import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-potvrda-emaila',
  templateUrl: './potvrda-emaila.component.html',
  styleUrls: ['./potvrda-emaila.component.css']
})
export class PotvrdaEmailaComponent implements OnInit {
  isPotvrda=false;
  urlParams:any = {};

  constructor(private securityService:SecurityService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.urlParams.token = this.route.snapshot.queryParamMap.get('token');
    this.urlParams.userid = this.route.snapshot.queryParamMap.get('userid');
    this.potvrdiEmail();
  }

  potvrdiEmail(){
    this.securityService.confirmEmail(this.urlParams).subscribe(() => {
      this.isPotvrda = true;
      Swal.fire("Potvrda", "Uspjesno ste potvrdili Email", "success");
    }, error => {      
      this.isPotvrda = false;
      Swal.fire("Greska", "Greska prilikom potvrdjivanja Emaila", "error");
    })
  }

}
