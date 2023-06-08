import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, 
    private modalService: NgbModal,

  ) {
    // redirect to home if already logged in

    if (this.authenticationService.currentUserValue) {

      this.router.navigate(['/']);
    }

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('Fetch logrado');
          console.log(data);
          if(data.tipoUsuario=="Administrador"){
            this.router.navigate(['inicioAdmin']);

          }
          else if(data.tipoUsuario=="Recepcionista"){
            this.router.navigate(['inicioRecepcionista']);

          }
          else if(data.tipoUsuario=="Cliente"){
            this.router.navigate(['inicioCliente']);

          }
          else{
            this.router.navigate(['login']);
          }
        },
        error => {
          const modalRef = this.modalService.open(AlertModalComponent);
          modalRef.componentInstance.title = 'Acceso Denegadoo';
          modalRef.componentInstance.message = error.error;
          this.loading = false;
        });

  }

}
