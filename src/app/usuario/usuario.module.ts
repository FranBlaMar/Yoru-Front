import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { RouterModule } from '@angular/router';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UsuarioRoutingModule,
    FormsModule
  ]
})
export class UsuarioModule { }
