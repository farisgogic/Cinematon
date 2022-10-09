import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProgressBarService } from '../progress-bar-service.service';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  model: any = {};

  constructor(private route: ActivatedRoute, private securityService: SecurityService, private router:Router) { }

  ngOnInit() {
    this.model.token = this.route.snapshot.queryParamMap.get('token');
    this.model.userid = this.route.snapshot.queryParamMap.get('userid');
  }
  changePassword() {
    this.securityService.changePassword(this.model).subscribe(() => {
      Swal.fire("Potvrda", "Uspjesno ste promijenili lozinku", "success");
      this.router.navigate(['/']);
    }, (error: any) => {
      console.log(error);
    })
  }
}
