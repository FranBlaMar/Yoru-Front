import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { PublicacionService } from '../publicacion/services/publicacion.service';

@Component({
  selector: 'app-mostrar-publicaciones',
  templateUrl: './mostrar-publicaciones.component.html',
  styleUrls: ['./mostrar-publicaciones.component.css']
})
export class MostrarPublicacionesComponent implements OnInit {

  constructor( private servicioPubli: PublicacionService) { }
  user!: userCompleto;
  publicaciones: Publicacion[] = [];
  visible: boolean = false;
  publicacionesGustadas: Publicacion[] = [];

  @Input() usuario!: userCompleto;

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }


   //Método para obtener las publicaciones del usuario deseado
   obtenerPublicaciones(){
    this.servicioPubli.obtenerPublicacionesDeUsuario(this.usuario.email)
    .subscribe({
      next: (resp) => {
        this.publicaciones = resp;
        this.obtenerPublicacionesGustadasUserlogueado();
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

  //Método para obtener las publicaciones que le han gustado a un usuario
  obtenerPublicacionesGustadasUserlogueado(){
    this.servicioPubli.obtenerPublicacionesGustadas()
    .subscribe({
      next: (resp) => {
        this.publicacionesGustadas = resp;
        this.visible = true;
      },
      error: (err) => {
        this.visible = true;
      }
    })
  }

  //Método para comprobar si una publicacion le ha gustado al usuario logueado o no
  comprobarLike(publi: Publicacion){
    let result: boolean = true;
    if(this.publicacionesGustadas.findIndex((x:any) => x.idPublicacion === publi.idPublicacion) == -1){
      result = false;
    }
    return result;
  }

  //Método para darle like a una publicación
  darLike(publi: Publicacion){
    this.servicioPubli.darLikeaPublicacion(publi)
    .subscribe( (resp) => this.ngOnInit())
  }

  //Método para quitarle el like a una publicación
  quitarLike(publi: Publicacion){
    this.servicioPubli.quitarLikeaPublicacion(publi)
    .subscribe( (resp) => this.ngOnInit())
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }
}
