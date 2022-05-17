import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { RealizarPublicacionComponent } from './publicacion/realizar-publicacion.component';
import { PerfilComponent } from './perfilUsuario/perfil.component';
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';
import { MostrarUsuarioBuscadoComponent } from './mostrar-usuario-buscado/mostrar-usuario-buscado.component';



@NgModule({
  declarations: [
    MainComponent,
    RealizarPublicacionComponent,
    PerfilComponent,
    BuscarUsuarioComponent,
    MostrarUsuarioBuscadoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class MainModule { }
