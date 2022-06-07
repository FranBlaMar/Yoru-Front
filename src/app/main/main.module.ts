import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main-routing.module';
import { RealizarPublicacionComponent } from './publicacion/realizar-publicacion.component';
import { PerfilComponent } from './perfilUsuario/perfil.component';
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';
import { MostrarUsuarioBuscadoComponent } from './mostrar-usuario-buscado/mostrar-usuario-buscado.component';
import { MostrarPublicacionesComponent } from './mostrar-publicaciones/mostrar-publicaciones.component';
import { PaginaPrincipalComponent } from './pagina-principal/pagina-principal.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {AvatarModule} from 'primeng/avatar';

@NgModule({
  declarations: [
    MainComponent,
    RealizarPublicacionComponent,
    PerfilComponent,
    BuscarUsuarioComponent,
    MostrarUsuarioBuscadoComponent,
    MostrarPublicacionesComponent,
    PaginaPrincipalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    InfiniteScrollModule,
    AvatarModule
  ]
})
export class MainModule { }
