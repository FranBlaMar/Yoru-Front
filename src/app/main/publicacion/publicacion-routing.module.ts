import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RealizarPublicacionComponent } from './realizar-publicacion/realizar-publicacion.component';

const routes: Routes = [

    {path:'', component: RealizarPublicacionComponent, pathMatch: "full"},
    {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [[RouterModule.forChild(routes)]],
})
export class PublicacionRoutingModule { }