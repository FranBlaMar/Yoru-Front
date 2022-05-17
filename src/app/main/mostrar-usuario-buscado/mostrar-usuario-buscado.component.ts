import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { PublicacionService } from '../publicacion/services/publicacion.service';

@Component({
  selector: 'app-mostrar-usuario-buscado',
  templateUrl: './mostrar-usuario-buscado.component.html',
  styleUrls: ['./mostrar-usuario-buscado.component.css']
})
export class MostrarUsuarioBuscadoComponent implements OnInit {

  constructor(private router: ActivatedRoute, private servicio: AuthService, private servicePublicacion: PublicacionService) { }
  userName: string = "";
  seguido: boolean = false;
  user!: userCompleto;
  publicaciones: Publicacion[] = [];
  visible: boolean = false;

  ngOnInit(): void {
    this.userName = this.router.snapshot.params["nombreUsuario"];
    this.servicio.comprobarNombreUsuario(this.userName).subscribe(
      (resp) => {
        this.user = resp[0];
        this.obtenerPublicaciones(resp[0].email)
      })

  }

  //Método para obtener las publicaciones del usuario logueado
  obtenerPublicaciones(user: string){
    this.servicePublicacion.obtenerPublicacionesDeUsuario(user)
    .subscribe({
      next: (resp) => {
        this.publicaciones = resp;
        this.visible = true;
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
