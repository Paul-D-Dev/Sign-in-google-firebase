import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

import {UserInterface} from "../models/user.interface";
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<UserInterface | null>

  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private afStore: AngularFirestore) {
    // @ts-ignore
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afStore
            .doc<UserInterface>(`users/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async googleSignIn() {
    console.log('SignIn');
    const provider = new GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    // @ts-ignore
    return this.updateUserData(credential.user);


  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigateByUrl('/');
  }

  private updateUserData({uid, email, displayName, photoUrl}: UserInterface) {
    console.log('Update data user');
    // Sets user data to firestore  on login
    const userRef: AngularFirestoreDocument<UserInterface> = this.afStore.doc(`users/${uid}`)
    const data: UserInterface = {
      uid,
      email,
      displayName,
      photoUrl
    }

    console.log(data);
    return userRef.set(data, {merge: true});
  }
}
