import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guardian } from '.././guardian.service';


const routes: Routes = [

  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),canActivate: [Guardian]
  },
  {
    path: 'publicacion',
    loadChildren: () => import('./publicacion/publicacion.module').then(m => m.PublicacionModule),canActivate: [Guardian]
  },
  { path: "**", redirectTo: 'usuario'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { 


  
}
