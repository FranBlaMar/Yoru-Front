import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }
  urlBase: string = environment.baseURL;
  

  //Método para enviar los datos de la publicación al backend
  enviarPublicacion(file: File, titulo: string, autor: string){
    const url = `${this.urlBase}/publicacion`;
    //Creamos el formData para enviar el archivo, el titulo y el autor de la publicación
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('titulo', titulo);
    formData.append('user', autor);

    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.post<Publicacion>(url, formData, { headers, reportProgress: true,
      responseType: 'json' });
  }


}
