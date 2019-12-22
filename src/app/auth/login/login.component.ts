import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from "../../services/auth.service";

import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;

  constructor(private auth: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ui")
      .subscribe(state => (this.isLoading = state.isLoading));
  }

  onLogin(data: any) {
    this.auth.login(data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
