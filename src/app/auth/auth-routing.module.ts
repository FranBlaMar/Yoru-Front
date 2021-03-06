import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationCodeIntroduceComponent } from './email-verification-code-introduce/email-verification-code-introduce.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path:"", component: LoginComponent, pathMatch: "full"
  },
  {
    path:"verificacion", component: EmailVerificationComponent
  },
  {
    path:"codigoVerificacion", component: EmailVerificationCodeIntroduceComponent
  },
  {
    path:"registro", component: RegisterComponent
  }
];

@NgModule({
  imports: [[RouterModule.forChild(routes)]],
})
export class AuthRoutingModule { }