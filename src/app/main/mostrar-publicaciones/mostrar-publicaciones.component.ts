import { Byte } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  constructor( private servicioPubli: PublicacionService, private servicioUser: AuthService) { }
  publicaciones: Publicacion[] = [];
  visible: boolean = false;
  publicacionesGustadas: Publicacion[] = [];
  @Input() usuario!: userCompleto;
  hayPublicaciones: number = 2;

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

   //Método para obtener las publicaciones del usuario deseado
   obtenerPublicaciones(){
    this.servicioPubli.obtenerPublicacionesDeUsuario(this.usuario.email)
    .subscribe({
      next: (resp) => {
        if(resp.length == 0){
          this.hayPublicaciones = 0;
          this.visible = true;
        }
        else{
          this.hayPublicaciones = 1;
          this.publicaciones = resp;
          this.obtenerPublicacionesGustadasUserlogueado();
        }
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


  //Método para añadir un comentario
  publicarComentario(publi: Publicacion,mensajeComentario: string){
    this.servicioPubli.añadirComentario(publi,mensajeComentario)
    .subscribe(
      (resp) => {this.ngOnInit()}
    )
  }

  //Método para borrar una publicación
  borrarPublicacion(publi: Publicacion){
    this.servicioPubli.borrarPublicacion(publi)
    .subscribe(
      (resp) => {
        this.publicaciones.splice(this.publicaciones.indexOf(publi), 1), 
        this.usuario.numeroPublicaciones --}
    )
  }

  //Método para comprobar si la publicacion mostrada pertenece al usuario logueado
  comprobarSiLaPublicacionEsDelUsuarioLogueado(publi: Publicacion){
    if(localStorage.getItem("email") == publi.autor.email){
      return true;
    }
    else{
      return false;
    }
  }

  //Método para darle like a una publicación
  darLike(publi: Publicacion){
    this.servicioPubli.darLikeaPublicacion(publi)
    .subscribe( (resp) => {
      this.publicacionesGustadas.push(publi);
      let indice = this.publicaciones.findIndex((x:any) => x.idPublicacion === publi.idPublicacion);
      this.publicaciones[indice].likes ++;

    })
  }


    //Método para quitarle el like a una publicación
    quitarLike(publi: Publicacion){
      this.servicioPubli.quitarLikeaPublicacion(publi)
      .subscribe( (resp) => {
        let indice = this.publicacionesGustadas.findIndex((x:any) => x.idPublicacion === publi.idPublicacion);
        this.publicacionesGustadas.splice(indice, 1);
        let indicePubli = this.publicaciones.findIndex((x:any) => x.idPublicacion === publi.idPublicacion);
        this.publicaciones[indicePubli].likes --;
      })
    }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }
}
