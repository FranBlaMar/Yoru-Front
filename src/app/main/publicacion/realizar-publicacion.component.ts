import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PublicacionService } from './services/publicacion.service';

@Component({
  selector: 'app-realizar-publicacion',
  templateUrl: './realizar-publicacion.component.html',
  styleUrls: ['./realizar-publicacion.component.css']
})
export class RealizarPublicacionComponent implements OnInit {

  constructor(private servicio: PublicacionService, private router: Router) { }

  imagen!: FileList;
  titulo: string = "";

  ngOnInit(): void {
  }

  obtenerFile(event: any): void {
    this.imagen = event.target.files;
  }


   //Método para subir una imagen 
   subirImagen(){
    let file: File | null = this.imagen.item(0);
    if(file){
      this.servicio.enviarPublicacion(file,this.titulo)
      .subscribe({
        next: (resp) => {
          this.router.navigateByUrl('main/perfil')
        },
        error: (err) => {
          Swal.fire({
            title: 'Error...',
            text: `La imagen tiene un tamaño o formato no permitido`,
            width: 600,
            padding: '5em',
            color: '#FFF',
            background: ' url(./assets/img/fondoError.gif)',
          })
        }
      })
    }
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }

}
