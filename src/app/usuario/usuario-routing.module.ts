import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [

  {
    path:"", component: PerfilComponent, pathMatch: "full"
  },
];

@NgModule({
  imports: [[RouterModule.forChild(routes)]],
})
export class UsuarioRoutingModule { }