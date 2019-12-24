import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store } from "@ngrx/store";
import { AppState } from "../../app.reducer";

import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean;

  subscription: Subscription;

  // frmRegister;
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.subscription = this.store
      .select("ui")
      .subscribe(state => (this.isLoading = state.isLoading));
  }

  onSubmitRegister(data: any): void {
    this.authService.createUser(data.usuario, data.email, data.password);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
