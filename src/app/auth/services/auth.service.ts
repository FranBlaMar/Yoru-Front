import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RespuestaAuth } from 'src/app/interfaces/token.interface';
import { userCompleto, userLogin } from 'src/app/interfaces/user.interface';
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
    register(user: userCompleto){
        const url = `${this.URLBase}/auth/register`;
        return this.http.post<RespuestaAuth>(url, user);
    }

    //Método para enviar correo de confirmación
    emailVerify(email: string){
        const url = `${this.URLBase}/auth/verification`;
        this.correo = email;
        this.http.post<number>(url, email.toString()).subscribe({
            next: (resp) => {
                this.codVerificacion = resp;
                this.route.navigateByUrl("/códigoVerificación")
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
  
    //Método para obtener un usuario por su email para comprobar si está en uso
    comprobarNombreUsuario(userName: string):Observable<userCompleto>{
        const url = `${ this.URLBase }/auth/${userName}`;
        return this.http.get<userCompleto>(url)
    }
}