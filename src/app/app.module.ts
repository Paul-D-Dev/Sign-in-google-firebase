import { NgModule } from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecretComponent } from './secret/secret.component';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOwolqz4Shi5xEtHSugDzBlFAq6NZz7E4",
  authDomain: "auth--signin-21589.firebaseapp.com",
  projectId: "auth--signin-21589",
  storageBucket: "auth--signin-21589.appspot.com",
  messagingSenderId: "556005518279",
  appId: "1:556005518279:web:30b6616cbbddd2f04507e2"
};

@NgModule({
  declarations: [
    AppComponent,
    SecretComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
