import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  constructor(private servicio: AuthService, private route: Router) { }
  resultados!: userCompleto[];
  busqueda: string = "";
  historial!: userCompleto[];
  historialVacio: boolean = true;

  ngOnInit(): void {
    this.historial=  JSON.parse(localStorage.getItem("historial") || "[]");
    if(this.historial.length == 0){
      this.historialVacio = true;
    }
    else{
      this.historialVacio = false;
    }
  }

  //Método para obtener usuarios mediante su userName
  buscarUsuario(){
    this.servicio.comprobarNombreUsuario(this.busqueda)
    .subscribe({
      next: (resp) => {
        this.resultados = resp;

        if(JSON.parse(localStorage.getItem("historial") || "[]").findIndex((x:any) => x.email === resp[0].email) == -1){
          this.historial.push(resp[0]); 
          this.historialVacio = false;
          console.log(JSON.parse(localStorage.getItem("historial") || "[]"));
          console.log(JSON.parse(localStorage.getItem("historial") || "[]").indexOf(resp[0]));
          localStorage.setItem("historial", JSON.stringify(this.historial));
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error...',
          text: `No existe ningún usuario con ese nombre`,
          width: 600,
          padding: '5em',
          color: '#FFF',
          background: ' url(./assets/img/fondoError.gif)',
        })
      }
    })
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }
}
