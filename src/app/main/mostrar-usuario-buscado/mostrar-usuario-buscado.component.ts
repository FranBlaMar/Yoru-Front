import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem, PrimeNGConfig} from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Publicacion } from 'src/app/interfaces/publicacion.interface';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { PublicacionService } from '../publicacion/services/publicacion.service';
import { MostrarOtrosUsuariosService } from './services/mostrar-otros-usuarios.service';

@Component({
  selector: 'app-mostrar-usuario-buscado',
  templateUrl: './mostrar-usuario-buscado.component.html',
  styleUrls: ['./mostrar-usuario-buscado.component.css']
})
export class MostrarUsuarioBuscadoComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig ,private router: ActivatedRoute, private servicio: AuthService, private servicePublicacion: PublicacionService, private servicioMostrarotroUser: MostrarOtrosUsuariosService) { }
  userName: string = "";
  seguido: boolean = false;
  user!: userCompleto;
  publicaciones: Publicacion[] = [];
  visible: boolean = false;
  esElMismoUsuario: boolean = false;
  esSeguido: boolean = false;
  checked1: boolean = false;

  checked2: boolean = true;
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.userName = this.router.snapshot.params["nombreUsuario"];
    this.servicio.comprobarNombreUsuario(this.userName).subscribe(
      (resp) => {
        this.user = resp[0];
        if(resp[0].email === localStorage.getItem("email")){
          this.esElMismoUsuario = true;
        }
        this.comprobarSiElUsuarioLeSigue();
      })

  }

  //Método para seguir a un usuario
  seguir(){
    this.servicioMostrarotroUser.seguirUsuario(this.user)
    .subscribe(
      (resp) => {this.esSeguido = true, this.ngOnInit()}
    )
  }

  //Método para dejar de seguir a un usuario
  dejarDeSeguir(){
    this.servicioMostrarotroUser.dejarDeSeguirUsuario(this.user)
    .subscribe(
      (resp) => {this.esSeguido = false, this.ngOnInit()}
    )
  }

  //Método para comprobar si el usuario logueado sigue al usuario al que está viendo el perfíl
  comprobarSiElUsuarioLeSigue(){
    this.servicioMostrarotroUser.comprobarSiYaSigueAlUsuario(this.user)
    .subscribe({
      next: (resp) => {
        if (resp != null){
        this.esSeguido = true
        this.visible = true;
      }else{
        this.esSeguido = false
        this.visible = true;
      }
      },
      error: (err) => {
        
      }
    })
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }

}
