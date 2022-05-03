import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionRoutingModule } from './publicacion-routing.module';
import { RealizarPublicacionComponent } from './realizar-publicacion/realizar-publicacion.component';



@NgModule({
  declarations: [
    RealizarPublicacionComponent
  ],
  imports: [
    CommonModule,
    PublicacionRoutingModule
  ]
})
export class PublicacionModule { }
