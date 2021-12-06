import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-olvide-contrasenha',
  templateUrl: './olvide-contrasenha.page.html',
  styleUrls: ['./olvide-contrasenha.page.scss'],
})
export class OlvideContrasenhaPage implements OnInit {

  recuperarContrasenha: FormGroup;

  constructor(private router: Router) { }

  notFound(){
    this.router.navigate(['/a']);
  }

  ngOnInit() {
    this.recuperarContrasenha = new FormGroup({
      user: new FormControl('',Validators.required)
    });
  }

  recuperar() {
    if (this.recuperarContrasenha.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        text: 'Los campos no pueden estar vacíos.',
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Correo enviado con éxito',
        text: 'Revisa tu carpeta de Spam',
        showConfirmButton: false
      });
      this.router.navigate(['/home']);
    };
  }

}
