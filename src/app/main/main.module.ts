import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioModule } from './usuario/usuario.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsuarioModule,
    PublicacionModule,
    SharedModule,
    RouterModule
  ]
})
export class MainModule { }
