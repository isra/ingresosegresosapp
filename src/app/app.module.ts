import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { environment } from "../environments/environment.prod";

// NGRX
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppReducers } from "./app.reducer";

// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppRoutingModule } from "./app-routing.module";

// App Modules
import { AuthModule } from "./auth/auth.module";
// import { IngresoEgresoModule } from "./ingreso-egreso/ingreso-egreso.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    StoreModule.forRoot(AppReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
