import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guardian } from '.././guardian.service';
import { BuscarUsuarioComponent } from './buscar-usuario/buscar-usuario.component';
import { MostrarUsuarioBuscadoComponent } from './mostrar-usuario-buscado/mostrar-usuario-buscado.component';
import { PerfilComponent } from './perfilUsuario/perfil.component';
import { RealizarPublicacionComponent } from './publicacion/realizar-publicacion.component';


const routes: Routes = [

  {
    path: 'perfil', component: PerfilComponent,canActivate: [Guardian]
  },
  {
    path: 'usuario/:nombreUsuario', component: MostrarUsuarioBuscadoComponent, canActivate: [Guardian]
  },
  {
    path: 'usuario', component: BuscarUsuarioComponent ,canActivate: [Guardian]
  },
  {
    path: 'publicacion', component: RealizarPublicacionComponent,canActivate: [Guardian]
  },
  { path: "**", redirectTo: 'perfil'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { 


  
}
