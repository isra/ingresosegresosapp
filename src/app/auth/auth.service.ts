import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import { User } from "../model/user.model";

import * as fromFirebase from "firebase";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((response: firebase.User) => {
      console.log("initAuthListener", response);
      if (!response) {
        return;
      }
      console.log("AuthState", response.email, response.uid);
    });
  }

  createUser(name, email, password): void {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        const user: User = {
          uid: response.user.uid,
          name: name,
          email: response.user.email
        };

        this.afStore
          .doc(`${response.user.uid}/user`)
          .set(user)
          .then(resp => {
            console.log("Response user create", resp);
            this.router.navigate(["/"]);
          })
          .catch(err => {
            Swal.fire("Error en Guardar Usuario", err.message, "error");
          });
      })
      .catch(err => {
        Swal.fire("Error al crear Usuario", err.message, "error");
      });
  }

  login(email: string, password: string): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        Swal.fire("Error en login", err.message, "error");
      });
  }

  logout(): void {
    this.afAuth.auth
      .signOut()
      .then(response => {
        this.router.navigate(["/login"]);
      })
      .catch(err => {
        Swal.fire("Error al cerrar sesión", err.message, "error");
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(userAuth => {
        if (userAuth === null || userAuth === undefined) {
          this.router.navigate(["login"]);
        }
        return userAuth !== null;
      })
    );
  }
}
