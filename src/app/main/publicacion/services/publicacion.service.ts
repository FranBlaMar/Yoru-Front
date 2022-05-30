import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from 'src/app/interfaces/comentario.interface';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }
  urlBase: string = environment.baseURL;
  

  //Método para enviar los datos de la publicación al backend
  enviarPublicacion(file: File, titulo: string){
    const url = `${this.urlBase}/publicacion`;
    //Creamos el formData para enviar el archivo y el titulo 
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.post<Publicacion>(url, formData, { headers, reportProgress: true,
      responseType: 'json' });
  }

  //Método para obtener publicaciones gustadas del usuario logueado
  obtenerPublicacionesGustadas(){
     const url = `${this.urlBase}/user/publicacionesGustadas`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.get<Publicacion[]>(url, {headers});
  }


  //Método para realizar la peticion de obtener publicaciones de un usuario
  obtenerPublicacionesDeUsuario(usuario: String){
    const url = `${this.urlBase}/publicacion/${usuario}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.get<Publicacion[]>(url, {headers});
  }

  //Método para realizar la petición para dar like a una publicación
  darLikeaPublicacion(publi: Publicacion){
    const url = `${this.urlBase}/user/publicacionesGustadas`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    const formData: FormData = new FormData();
    formData.append('publicacion', publi.idPublicacion.toString());
    return this.http.post<Publicacion[]>(url, formData,{headers});
  }

  //Método para realizar la petición para quitar el like a una publicación
  quitarLikeaPublicacion(publi: Publicacion){
    const url = `${this.urlBase}/user/publicacionesGustadas/${publi.idPublicacion.toString()}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.delete<Publicacion[]>(url,{headers});
  }

  //Método para borrar una publicación
  borrarPublicacion(publi :Publicacion){
    const url = `${this.urlBase}/publicacion/${publi.idPublicacion.toString()}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.delete<Publicacion>(url,{headers});
  }

  //Método para añadir un comentario a una publicación
  añadirComentario(publi:Publicacion, comentario: string){
    const url = `${this.urlBase}/publicacion/${publi.idPublicacion.toString()}/comentario`;
    const formData: FormData = new FormData();
    formData.append('comentario', comentario);
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.post<Comentario>(url,formData,{headers});
  }

  //Método para obtener comentarios de una publicacion
  obtenerComentarios(publi: Publicacion){
    const url = `${this.urlBase}/publicacion/${publi.idPublicacion.toString()}/comentario`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.get<Comentario>(url,{headers});
  }
  
}
