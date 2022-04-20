import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { map, catchError, of } from 'rxjs';
import { AuthService } from "./auth/services/auth.service";


@Injectable()
export class Guardian implements CanActivate{

    constructor(private router:Router, private servicio: AuthService){};

    canActivate(){
        let tokenValido:boolean = false;
        return this.servicio.comprobarToken()
        //Usamos .pipe para retornar el token obtenido en la petición
        .pipe(
            map(resp =>{
                tokenValido = true;
                return tokenValido;
            }),
            catchError (err =>{
                tokenValido = false;
                this.router.navigateByUrl('');
                return of(tokenValido)
            })
        )
    }


}