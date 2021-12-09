import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Pacientes } from '../registrar/pacientes.interface';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public paciente$: Observable<Pacientes>;

  constructor(private firebase: AngularFirestore, public auth: AngularFireAuth, private router: Router) {
    this.paciente$ = this.auth.authState.pipe(
      switchMap((paciente) => {
        if (paciente) {
          return this.firebase.doc<Pacientes>(`Pacientes/${paciente.uid}`).valueChanges();
        }
        // of para devolver un observable null en caso de que no
        return of(null)
      })
    )
  }

  registrar(data) {
    return this.firebase.collection('Pacientes').doc(data.uid).set(data);
  }

  async signup(email: string, password: string) {
    try {
      const paciente = await this.auth.createUserWithEmailAndPassword(email, password);
      await this.sendNotification();
      return paciente;
    } catch (error) {
      console.log('Error ->'), error;

    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error ->'), error;
    }
  }

  async sendNotification(): Promise<void> {
    try {
      return (await this.auth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error ->'), error;

    }
  }

  redirectUser(isVerified: boolean) {
    if (isVerified) {
      console.log(isVerified);

      this.router.navigate(['/home']);
    } else {

      this.router.navigate(['/login']);

    }

  }

  isEmailVerified(paciente): boolean {
    console.log(paciente);

    return paciente.user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login'])
    } catch (error) {
      console.log('Error ->'), error;

    }
  }
}





