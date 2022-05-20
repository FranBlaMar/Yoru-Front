import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { userCompleto } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class MostrarOtrosUsuariosService {

  constructor(private http: HttpClient, private servicio: AuthService) { }
  urlBase: string = environment.baseURL;

  //Método para comprobar si un usuario es seguido por el usuario logueado
  comprobarSiYaSigueAlUsuario(user: userCompleto){
    const url = `${this.urlBase}/user/follower/${user.email}`;
    console.log(user);
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.get<userCompleto>(url,{headers});
  }

  //Método para dejar de seguir a un usuario
  dejarDeSeguirUsuario(user: userCompleto){
    const url = `${this.urlBase}/user/follower/${user.email}`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);
    return this.http.delete<userCompleto>(url, {headers});
  }

  //Método para seguir a un usuario
  seguirUsuario(user: userCompleto){
    const url = `${this.urlBase}/user/follower`;
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '',);

    const formData: FormData = new FormData();
    formData.append('seguido', user.email);

    return this.http.post<userCompleto>(url, formData,{headers});
  }
}
