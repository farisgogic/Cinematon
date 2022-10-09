import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import Swal from 'sweetalert2';
import { ProgressBarService } from '../progress-bar-service.service';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private securityService: SecurityService, public progressBar: ProgressBarService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const resetPasswordObserver = {
      next: (x: any) => {
        Swal.fire("Potvrda", "Provjerite email postu", "success");
      },
      error: (err: any) => {
        console.log(err);
      }
    };
    this.securityService.resetPassword(f.value).subscribe(resetPasswordObserver);
  }


}
