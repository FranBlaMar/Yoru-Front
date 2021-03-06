import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guardian } from './guardian.service';
import { MainComponent } from './main/main.component';


const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'main',
    component: MainComponent,
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),canActivate: [Guardian]
  },
  { path: "**", redirectTo: ''}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


  
}
