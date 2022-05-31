import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { PublicacionService } from '../publicacion/services/publicacion.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor( private servicioPubli: PublicacionService, private servicioUser: AuthService) { }
  publicaciones: Publicacion[] = [];
  visible: boolean = false;
  publicacionesGustadas: Publicacion[] = [];
  mensajeComentario: string = "";
  longitudComentario: number = this.mensajeComentario.length;
  hayPublicaciones: number = 1;
  
  ngOnInit(): void {
    this.servicioUser.obtenerPublicacionesSeguidos()
    .subscribe(
      (resp) => {this.publicaciones = resp, 
        this.obtenerPublicacionesGustadasUserlogueado()}
    )
  }

    //Método para comprobar que la longitud del comentario es mayor a 0 y menor que 30
    comprobarLongitud(){
      this.longitudComentario = this.mensajeComentario.length;
    }
  
    //Método para obtener las publicaciones que le han gustado a un usuario
    obtenerPublicacionesGustadasUserlogueado(){
      this.servicioPubli.obtenerPublicacionesGustadas()
      .subscribe({
        next: (resp) => {
          if(resp.length == 0){
            this.hayPublicaciones = 0;
            this.visible = true;
          }
          else{
            this.publicacionesGustadas = resp;
            this.visible = true;
          }
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
    publicarComentario(publi: Publicacion,){
      this.servicioPubli.añadirComentario(publi,this.mensajeComentario)
      .subscribe(
        (resp) => {this.ngOnInit(), this.mensajeComentario = "", this.longitudComentario = 0}
      )
    }
  
    //Método para borrar una publicación
    borrarPublicacion(publi: Publicacion){
      this.servicioPubli.borrarPublicacion(publi)
      .subscribe(
        (resp) => this.publicaciones.splice(this.publicaciones.indexOf(publi), 1), 

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
