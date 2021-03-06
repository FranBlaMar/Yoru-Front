import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { RespuestaAuth } from 'src/app/interfaces/token.interface';
import { hobbie, userCompleto, userLogin } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private URLBase: string = environment.baseURL;
  private correo: string = "";
  private codVerificacion: number = 0;
  constructor( private http: HttpClient, private route: Router) { }

    //Método para hacer login
    login(user: userLogin){
        const url = `${this.URLBase}/auth/login`;
        return this.http.post<RespuestaAuth>(url, user);
    }

    //Método para registrar
    register(email: string, userName: string, password: string, fotoPerfil: File){
        const url = `${this.URLBase}/auth/register`;
        const datos: FormData = new FormData();
        datos.append('email', email);
        datos.append('file', fotoPerfil);
        datos.append('userName', userName);
        datos.append('password', password);
        
        return this.http.post<RespuestaAuth>(url, datos);
    }

    //Método para enviar correo de confirmación
    emailVerify(email: string){
        const url = `${this.URLBase}/auth/verification`;
        this.correo = email;
        this.http.post<number>(url, email.toString()).subscribe({
            next: (resp) => {
                this.codVerificacion = resp;
                this.route.navigateByUrl("/codigoVerificacion")
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
    };

    //Método para obtener el correo electronico del usuario
    getCorreo(){
        return this.correo;
    }

    //Método para obtener el codido de verificacion
    getCodigoVerificacion(){
        return this.codVerificacion;
    }


    //Método para comprobar si un token es valido
    comprobarToken():Observable<userCompleto>{
        const url = `${ this.URLBase }/user`;
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        return this.http.get<userCompleto>( url, { headers } ) 
    }
  
    //Método para obtener un usuario por su nombreDeUsuario para comprobar si está en uso
    comprobarNombreUsuario(userName: string):Observable<userCompleto[]>{
        const url = `${ this.URLBase }/user/${userName}`;
        return this.http.get<userCompleto[]>(url)
    }

    //Método para enviar un usuario a editar al backend
    editarUsuario(user: userCompleto){
        const url = `${ this.URLBase }/user`;
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        return this.http.put<userCompleto>( url, user, {headers} ) 
    }

    //Método para editar la foto de perfil del usuario logueado
    editarFotoPerfil(fotoPerfil: File){
        const url = `${ this.URLBase }/user/fotoPerfil`;
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        const datos: FormData = new FormData();
        datos.append('file', fotoPerfil);
        return this.http.put<userCompleto>( url, datos, {headers} )
    }

    //Método para obtener las publicaciones de los seguidos del usuario logueado
    obtenerPublicacionesSeguidos(offSet: number){
        const url = `${ this.URLBase }/user/follower/publicacion/${offSet}`;
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        return this.http.get<Publicacion[]>( url, {headers} ) 
    }

    //Método para obtener todos los hobbies
    obtenerHobbies(){
        const url = `${ this.URLBase }/hobbie`;
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        return this.http.get<hobbie[]>( url, {headers} ) 
    }

    //Método para obtener usuarios mediante su hobbie
    buscarUserPorHobbie(hobbie: string, offset: number){
        const url = `${ this.URLBase }/user/${hobbie}/${offset}`;
        const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('jwt')}`  || '' );
        return this.http.get<userCompleto[]>( url, {headers} ) 
    }
}