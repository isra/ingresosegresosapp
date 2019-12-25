import { Injectable } from "@angular/core";
import { CanActivate, CanLoad } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

  canLoad() {
    return this.authService.isAuthenticated().pipe(take(1));
  }
}
