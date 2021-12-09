import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  public contactForm: FormGroup;

  createFormGroup() {
    return new FormGroup({
      Nombre: new FormControl('', [Validators.required]),
      Apellidos: new FormControl('', [Validators.required]),
      Celular: new FormControl('', [Validators.required]),
      FechaNacimiento: new FormControl('', [Validators.required]),
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),

    });
  }
  constructor(private fireService: FirestoreService) {
    this.contactForm = this.createFormGroup();

  }

  ngOnInit() {
  }

  async Registrar() {

    if (this.contactForm.invalid) {
      alert('Formulario no completado');
    } else {
      try {
        const user = await this.fireService.signup(this.Email.value, this.Password.value)
        if (user) {
          console.log(user);
          //todo: Verificar si el email esta verificado
          const isVerified = this.fireService.isEmailVerified(user);
          this.fireService.registrar(this.contactForm.value).then(res => {
            alert('Se ha registrado!!!');
            this.fireService.redirectUser(isVerified);

          }, err => {
            console.log(err);
          })
          console.log('verified ->', isVerified);
        }
      } catch (error) {

      }
    }

  }


  get Email() { return this.contactForm.get('Email'); }
  get Password() { return this.contactForm.get('Password'); }

}
