import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

import Swal from "sweetalert2";

import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import * as fromUI from "../shared/ui.actions";
import * as fromAuth from "./auth.actions";

import { User } from "./user.model";

import * as fromFirebase from "firebase";

import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  userSubscription: Subscription = new Subscription();
  user: User;

  constructor(
    private store: Store<AppState>,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore,
    private router: Router
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userSubscription = this.afStore
          .doc(`${user.uid}/user`)
          .valueChanges()
          .subscribe((valuesChange: any) => {
            const userObj = new User(valuesChange);
            this.user = userObj;
            this.store.dispatch(new fromAuth.SetUserAction(userObj));
          });
      } else {
        this.userSubscription.unsubscribe();
        this.user = null;
      }
    });
  }

  createUser(name, email, password): void {
    this.store.dispatch(new fromUI.ActivateLoadingAction());

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
            // console.log("Response user create", resp);
            this.store.dispatch(new fromUI.DesactivateLoadingAction());
            this.router.navigate(["/"]);
          })
          .catch(err => {
            this.store.dispatch(new fromUI.DesactivateLoadingAction());
            Swal.fire("Error en Guardar Usuario", err.message, "error");
          });
      })
      .catch(err => {
        this.store.dispatch(new fromUI.DesactivateLoadingAction());
        Swal.fire("Error al crear Usuario", err.message, "error");
      });
  }

  login(email: string, password: string): void {
    this.store.dispatch(new fromUI.ActivateLoadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new fromUI.DesactivateLoadingAction());
        this.router.navigate(["/dashboard"]);
      })
      .catch(err => {
        this.store.dispatch(new fromUI.DesactivateLoadingAction());
        Swal.fire("Error en login", err.message, "error");
      });
  }

  logout(): void {
    this.store.dispatch(new fromAuth.UnsetUserAction());
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

  getUser(): User {
    if (this.user) {
      return {
        ...this.user
      };
    }
    return null;
  }
}
