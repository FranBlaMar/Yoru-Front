import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Comentario } from 'src/app/interfaces/comentario.interface';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { PublicacionService } from '../publicacion/services/publicacion.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor( private servicioPubli: PublicacionService, private servicioUser: AuthService) { }
  offSet: number = 0;
  publicaciones: Publicacion[] = [];
  visible: boolean = false;
  publicacionesGustadas: Publicacion[] = [];
  mensajeComentario: string = "";
  longitudComentario: number = this.mensajeComentario.length;
  hayPublicaciones: number = 1;
  
  ngOnInit(): void {
    this.servicioUser.obtenerPublicacionesSeguidos(this.offSet)
    .subscribe(
      (resp) => {this.publicaciones.push.apply(this.publicaciones, resp), 
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
            this.visible = true;
            if(this.publicaciones.length == 0){
              this.hayPublicaciones = 0;
            }
          }
          else{
            this.publicacionesGustadas = resp;
            this.visible = true;
            if(this.publicaciones.length == 0){
              this.hayPublicaciones = 0;
            }
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
    publicarComentario(publi: Publicacion,mensajeComentario: string){
    this.servicioPubli.añadirComentario(publi,mensajeComentario)
    .subscribe(
      (resp) => {
        this.servicioUser.comprobarToken()
        .subscribe(
          (resp) => {
            let coment: Comentario = {
              idComentario: 0,
              cuerpoComentario: mensajeComentario,
              autor: resp
            }
            let indice: number = this.publicaciones.findIndex(((x:any) => x.idPublicacion === publi.idPublicacion));
            this.publicaciones[indice].comentarios.push(coment);
           }
        )
      }
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


    scrollDown(){
      this.offSet ++;
      console.log(this.offSet)
      this.ngOnInit();
    }
}
