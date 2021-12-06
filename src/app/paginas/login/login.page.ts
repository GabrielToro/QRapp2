/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { Storage } from '@ionic/storage-angular';
import { BdLocalService } from 'src/app/services/bd-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  autenticado = false;

  constructor(private router: Router, private storage: Storage,private bdLocalService: BdLocalService){}

  // Se instancia el formulario usuario como un grupo, para luego hacer las validaciones correspondientes
  inicioSesion: FormGroup;

  usuario: Usuarios[]=[];

  // Validadores de usuario y contraseña
  ngOnInit() {
    this.inicioSesion = new FormGroup({
      user: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  // Botón para iniciar sesión y validar si los campos no están vacíos
  async iniciarSesion(){

    if (this.inicioSesion.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'Los campos no pueden estar vacíos.',
        showConfirmButton: false
      });
    } else {
      if (this.bdLocalService.existeUsuario(this.inicioSesion.get('user').value, this.inicioSesion.get('password').value)) {
        this.router.navigate(['/index']);
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error',
          text: 'Datos erroneos',
          showConfirmButton: false
        });
      }
    };
  }

  // Función para redirigir a página Olvidé Contraseña
  olvideContrasenha(){
    this.router.navigate(['/olvide-contrasenha']);
  }

  getBoolean() {
    return !!this.inicioSesion.valid;
  }
}

