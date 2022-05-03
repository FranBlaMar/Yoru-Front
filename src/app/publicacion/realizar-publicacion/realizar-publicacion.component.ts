import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../services/publicacion.service';

@Component({
  selector: 'app-realizar-publicacion',
  templateUrl: './realizar-publicacion.component.html',
  styleUrls: ['./realizar-publicacion.component.css']
})
export class RealizarPublicacionComponent implements OnInit {

  constructor(private servicio: PublicacionService) { }

  imagen!: File;
  titulo: string = "";
  autor: string = "";
  ngOnInit(): void {
  }


  //Método para subir una imagen 
  subirImagen(){
    this.autor = localStorage.getItem("email") || "";
    this.servicio.enviarPublicacion(this.imagen,this.titulo, this.autor).subscribe(
      (resp) => console.log(resp)
    );
  }

}
