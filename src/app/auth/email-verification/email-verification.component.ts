import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private builder: FormBuilder, private servicio: AuthService, private route: Router) { }

  ngOnInit(): void {
  }


  formularioRegistro: FormGroup = this.builder.group({
    email: ['',[Validators.required, Validators.pattern("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$")]]
  });

  //Enviar codigo de confirmación al correo introducido
  sendConfirmationCodeToEmail(){
    this.servicio.emailVerify(this.formularioRegistro.value.email)

  }
}
