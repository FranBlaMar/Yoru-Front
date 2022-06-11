import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { hobbie, userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  constructor(private servicio: AuthService, private route: Router) { }
  hayMasResultados: boolean = true;
  inicio: boolean = true;
  resultados!: userCompleto[];
  resultadosHobbie: userCompleto[] = [];
  offSet: number = 0;
  busqueda: string = "";
  historial!: userCompleto[];
  historialVacio: boolean = true;
  listaHobbies: hobbie[] = [];
  visible: boolean = false;
  busquedaHobbie: string = "";

  ngOnInit(): void {
    this.obtenerHobbiesRedSocial();
    this.historial=  JSON.parse(localStorage.getItem("historial") || "[]");
    if(this.historial.length == 0){
      this.historialVacio = true;

    }
    else{
      this.historialVacio = false;
    }
  }


  //Método para obtener todos los hobbies
  obtenerHobbiesRedSocial(){
    this.servicio.obtenerHobbies()
    .subscribe(
      (resp) => {this.listaHobbies = resp, this.visible = true}
    )
  }

  //Método para obtener usuarios mediante su userName
  buscarUsuario(){
    this.servicio.comprobarNombreUsuario(this.busqueda)
    .subscribe({
      next: (resp) => {
        if(resp.length == 0){
          Swal.fire({
            title: 'Error...',
            text: `No existe ningún usuario con ese nombre`,
            width: 600,
            padding: '5em',
            color: '#FFF',
            background: ' url(./assets/img/fondoError.gif)',
          })
        }
        else{
          this.resultados = resp;
          if(JSON.parse(localStorage.getItem("historial") || "[]").findIndex((x:any) => x.email === resp[0].email) == -1){
            if(JSON.parse(localStorage.getItem("historial") || "[]").length == 4){
              this.historial.shift();
              this.historial.push(resp[0]); 
              this.historialVacio = false;
              localStorage.setItem("historial", JSON.stringify(this.historial));
            }
            else{
              this.historial.push(resp[0]); 
              this.historialVacio = false;
              localStorage.setItem("historial", JSON.stringify(this.historial));
            }
          }
        }


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
  }

  //Metodo para buscar nuevos susuarios medaitne un hobbie diferente
  cambiarHobbieBusqueda(){
    this.offSet = 0;
    this.resultadosHobbie = [];
    this.buscarUsuarioHobbie();
  }

  //Método para mostar mas usuarios con el hobbie ya buscado
  mostrarMas(){
    this.offSet ++;
    this.buscarUsuarioHobbie();
  }

  //Método para obtener usuarios mediante su hobbie
  buscarUsuarioHobbie(){
    this.servicio.buscarUserPorHobbie(this.busquedaHobbie, this.offSet)
    .subscribe({
      next: (resp) => {
          this.resultadosHobbie.push.apply(this.resultadosHobbie, resp)
          this.inicio = false;
          if(resp.length < 3){
            this.hayMasResultados = false;
          }
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
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }
}
