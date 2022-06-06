import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { userCompleto } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { PublicacionService } from './services/publicacion.service';
import Compressor from 'compressorjs';
@Component({
  selector: 'app-realizar-publicacion',
  templateUrl: './realizar-publicacion.component.html',
  styleUrls: ['./realizar-publicacion.component.css']
})
export class RealizarPublicacionComponent implements OnInit {
  static imagenComprimida: any;

  constructor(private builder: FormBuilder, private servicio: PublicacionService, private router: Router, private servicioAuth: AuthService) { }
  imagen!: FileList;
  titulo: string = "";
  user!: userCompleto;
  visible: boolean = false;
  imageURL: String = "../../../assets/img/camara.jpg";

  ngOnInit(): void {
    this.obtenerUsuarioLogeado();
  }
  //Método para obtene runa imagen de un file input
  obtenerFile(event: any): void {
    this.imagen = event.target.files;
    //Método de una librería externa para comprimir archivos
    //Selecciono la imagen a comprimir, la calidad (Quality: 0 - 1)
    //Success devuelve la imagen comprimida
    //No deja obtener los campos dentro del método por lo cual es necesario usar una variable estática
    new Compressor(this.imagen[0],{ quality: 0.3, success(result) {
      RealizarPublicacionComponent.imagenComprimida = result;
    }
    });
    this.imagen = event.target.files;
    const reader = new FileReader();
    reader.onload = () => 
      this.imageURL = reader.result as string;
      reader.readAsDataURL(this.imagen[0])
  }

  

  formularioPublicacion: FormGroup = this.builder.group({
    titulo: [ '', [ Validators.required]],
    imagen: [this.imagen, [ Validators.required]]
  });

   //metodo para obtener el usuario 
   obtenerUsuarioLogeado(){
    this.servicioAuth.comprobarToken().subscribe({
      next: (resp) => {
        this.user = resp;
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


   //Método para subir una imagen 
   subirImagen(){
    let file: File | null = RealizarPublicacionComponent.imagenComprimida;
    if(file){
      this.servicio.enviarPublicacion(file,this.formularioPublicacion.value.titulo)
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
