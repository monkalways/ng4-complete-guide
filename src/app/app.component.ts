import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDL82Kngkq8oeoiaf7dq2FpIsg4gp4Z230",
      authDomain: "ng-recipe-book-b3542.firebaseapp.com"
    });
  }
}
