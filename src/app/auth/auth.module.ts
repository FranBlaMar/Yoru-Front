import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { EmailVerificationCodeIntroduceComponent } from './email-verification-code-introduce/email-verification-code-introduce.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    EmailVerificationComponent,
    EmailVerificationCodeIntroduceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AuthModule { }
