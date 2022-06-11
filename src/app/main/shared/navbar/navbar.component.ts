import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { userCompleto } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private servicio: AuthService) { }
  paramsSubscription!: Subscription;

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  user!: userCompleto;
  visible: boolean = false;

  
  //Método para obtener al usuario logueado
  obtenerUsuario(){
    this.servicio.comprobarToken()
    .subscribe(
      (resp) => {
      this.user = resp, this.visible = true
      }
    )
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }

  //Metodo para cerrar sesion 
  cerrarSesion(){
    localStorage.clear();
    this.router.navigateByUrl('');
  }

}
