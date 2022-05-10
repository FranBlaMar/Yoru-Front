import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { PublicacionService } from '../../publicacion/services/publicacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private servicioAuth: AuthService, private servicioPubli: PublicacionService) { }
  user!: userCompleto;
  visible: boolean = false;
  publicaciones: Publicacion[] = [];


  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }

  //metodo para obtener el usuario 
  obtenerUsuarioLogeado(){
    this.servicioAuth.comprobarToken().subscribe({
      next: (resp) => {
        this.user = resp;
        this.obtenerPublicaciones();
      },
      error: (err) => {
        Swal.fire({
          title: 'Error...',
          text: `${err.error.errorMessage}`,
          width: 600,
          padding: '5em',
          color: '#FFF',
          background: ' url(./assets/img/fondoError.gif)',
        })
      }
    })
  }

  //Método para obtener las publicaciones del usuario logueado
  obtenerPublicaciones(){
    this.servicioPubli.obtenerPublicacionesDeUsuario(this.user.email)
    .subscribe({
      next: (resp) => {
        this.publicaciones = resp;
        this.visible = true;
        console.log(resp)
      },
      error: (err) => {
        Swal.fire({
          title: 'Error...',
          text: `${err.error.errorMessage}`,
          width: 600,
          padding: '5em',
          color: '#FFF',
          background: ' url(./assets/img/fondoError.gif)',
        })
      }
    })
  }


  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }
}
