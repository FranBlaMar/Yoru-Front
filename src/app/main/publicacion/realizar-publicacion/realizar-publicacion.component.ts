import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';

@Component({
  selector: 'app-realizar-publicacion',
  templateUrl: './realizar-publicacion.component.html',
  styleUrls: ['./realizar-publicacion.component.css']
})
export class RealizarPublicacionComponent implements OnInit {

  constructor(private servicio: PublicacionService) { }

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
      this.servicio.enviarPublicacion(file,this.titulo).subscribe(
        (resp) => console.log(resp)
        );
    }
  }

  //Método para transformar un array de bytes en url base 64
  transformarAImagen(file: Byte[]){
    return 'data:image/png;base64,' + btoa(String.fromCharCode(...new Uint8Array(file))) + file;
  }

}
