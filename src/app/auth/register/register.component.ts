import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { userCompleto, userRegistro } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  imagen!: FileList;

  formularioRegistro: FormGroup = this.builder.group({
    userName: [ '', [ Validators.required, Validators.minLength(3) ],  [this.comprobarNombreUsuario()]],
    password: ['',[Validators.required, Validators.minLength(8), Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]],
    repetirPassword: ['', [Validators.required, this.validarContraseña ]],
    email: [this.servicio.getCorreo()],
    fotoPerfil: [this.imagen, []]
  },{
    validators: [this.validarContraseña('password','repetirPassword')]
  });


  //Método para obtene runa imagen de un file input
  obtenerFile(event: any): void {
    this.imagen = event.target.files;
  }

  constructor(private builder: FormBuilder, private servicio: AuthService, private route: Router) { }


  ngOnInit(): void {
  }
  //Validación personalizada para comprobar que el usuario introduce correctamente su contraseña
  validarContraseña( contraseña: string, repetirContraseña: string) {
    return (form:  AbstractControl) =>{
    let contra = form.get(contraseña)?.value;
    let reContra = form.get(repetirContraseña)?.value;

    if ( contra !== reContra ) {
      form.get(repetirContraseña)?.setErrors({ errorIguales: true });
      return { errorIguales: true }
    } 
    form.get(repetirContraseña)?.setErrors(null);
    return null
  }
  }


  //Método para comprobar si existe el nombre de usuario
  comprobarNombreUsuario(): AsyncValidatorFn{
    return(form:AbstractControl): Observable<ValidationErrors | null >  =>{
      let userName = form.value;

      return this.servicio.comprobarNombreUsuario(userName)
      .pipe(
        map( res => {return res != null ? { existente: true } : null}
      ))
    }
  }

  //Método para validar el username y podre mostrar el mensaje de error
  validarUserName(){
    return this.formularioRegistro.controls['userName'].errors?.['existente'] && this.formularioRegistro.controls['userName'].touched ? true : false;
  }

  //Metodo para registrar un usuario
  register(){
    let file: File | null = this.imagen.item(0);
    if(file){
    this.servicio.register(this.formularioRegistro.value.email,this.formularioRegistro.value.userName, this.formularioRegistro.value.password, file )
    .subscribe({
      next: (resp) => {
        localStorage.setItem("jwt",resp.jwt_token), localStorage.setItem("email",this.formularioRegistro.value.email);
        this.route.navigateByUrl("main") 
      },
      error: (err) => {
        Swal.fire({
          title: 'Error...',
          text: `${err.error.mensajeDeError}`,
          width: 600,
          padding: '5em',
          color: '#FFF',
          background: ' url(./assets/img/fondoError.gif)',
          backdrop: `
            rgba(0,0,123,0.4)
          `
        })
      }
    })
  }
  }

}
