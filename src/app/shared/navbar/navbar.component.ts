import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";

import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {
  userName: string;
  userSubscription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) {
    this.userSubscription = this.store
      .select("auth")
      .pipe(filter(docAuth => docAuth.user !== null))
      .subscribe(docAuth => (this.userName = docAuth.user.name));
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
