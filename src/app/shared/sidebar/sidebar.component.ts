import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";

import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";
import * as fromAuth from "../../actions/auth.actions";

import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import { IngresoEngresoService } from "../../services/ingreso-engreso.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  userName: string;

  userSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private ingresoEgresoService: IngresoEngresoService
  ) {
    this.userSubscription = this.store
      .select("auth")
      .pipe(filter(docAuth => docAuth.user !== null))
      .subscribe(docAuth => (this.userName = docAuth.user.name));
  }

  ngOnInit() {}

  logout() {
    this.ingresoEgresoService.cancelSubscriptions();
    this.auth.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
