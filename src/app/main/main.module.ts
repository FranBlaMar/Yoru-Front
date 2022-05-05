import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioModule } from './usuario/usuario.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioModule,
    PublicacionModule,
    SharedModule
  ]
})
export class MainModule { }
