import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userLogin } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: userLogin = {
    email: '',
    password: ''
  };
  constructor(private servicio: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  //Metodo para hacer login
  login(){
    console.log(this.user)
    this.servicio.login(this.user)
    .subscribe({
      next: (resp) => {
        localStorage.setItem("jwt",resp.jwt_token);
        localStorage.setItem("email",this.user.email);
        this.route.navigateByUrl("usuario") 
      },
      error: (err) => {
        Swal.fire({
          title: 'Error...',
          text: `${err.error.errorMessage}`,
          width: 600,
          padding: '5em',
          color: '#FFF',
          background: ' url(./assets/img/fondoError.gif)',
        })
      }
    })
  }

}
