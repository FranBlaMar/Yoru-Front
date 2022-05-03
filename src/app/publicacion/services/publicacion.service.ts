import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }
  urlBase: string = environment.baseURL;
  

  //Método para enviar los datos de la publicación del back 
  enviarPublicacion(file: File, titulo: string, autor: string){
    const url = `${this.urlBase}/subirImagen`;
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);
    formData.append('user', autor);
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
    return this.http.post(url, formData, { headers });
  }


}
