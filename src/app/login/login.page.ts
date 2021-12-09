import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public contactForm: FormGroup;

  createFormGroup() {
    return new FormGroup({
      Email: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),

    });
  }
  constructor(private routes: Router, private fireService: FirestoreService) {
    this.contactForm = this.createFormGroup();

  }

  ngOnInit() {
  }

  async Login() {
    if (this.contactForm.invalid) {
      alert('Formulario incorrecto');
    } else {
      try {
        const user = await this.fireService.loginWithEmail(this.Email.value, this.Password.value);
        if (user) {
          const isVerified = this.fireService.isEmailVerified(user);
          console.log('verified ->', isVerified);
          this.routes.navigate(['/home']);
        }
      } catch (error) {
        console.log('Error->', error);

      }
    }
  }

  get Email() { return this.contactForm.get('Email'); }
  get Password() { return this.contactForm.get('Password'); }

}
