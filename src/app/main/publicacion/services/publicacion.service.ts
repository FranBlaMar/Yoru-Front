import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { userCompleto } from 'src/app/interfaces/user.interface';
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

  //Método para realizar la peticion de obtener publicaciones de un usuario
  obtenerPublicacionesDeUsuario(usuario: String){
    const url = `${this.urlBase}/publicaciones/${usuario}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.get<Publicacion[]>(url, {headers});
  }



}
