import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getToken()
          .then(token => {
            this.token = token; 
            console.log(this.token); 
          });
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  signoutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigateByUrl('/');
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then(token => this.token = token);
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
