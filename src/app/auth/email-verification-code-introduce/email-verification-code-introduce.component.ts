import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification-code-introduce',
  templateUrl: './email-verification-code-introduce.component.html',
  styleUrls: ['./email-verification-code-introduce.component.css']
})
export class EmailVerificationCodeIntroduceComponent implements OnInit {

  email: string = "";
  constructor(private servicio: AuthService, private route: Router) { }

  codigoVerificacionIntroducido: number = 0;
  codigoVerificacionReal: number = this.servicio.getCodigoVerificacion();
  ngOnInit(): void {
    this.email = this.servicio.getCorreo();
    console.log(this.codigoVerificacionIntroducido);
    console.log(this.codigoVerificacionReal);
  }


  //Método para comprobar codigo de verificacion del correo
  comprobarCodigo(){
    if(this.codigoVerificacionReal == this.codigoVerificacionIntroducido){
      this.route.navigateByUrl("/registro");
    }
    else{
      Swal.fire({
        title: 'Error...',
        text: `Código de verificación incorrecto`,
        width: 600,
        padding: '5em',
        color: '#FFF',
        background: ' url(./assets/img/fondoError.gif)',
      })
    }
  }
}
