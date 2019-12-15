import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styles: []
})
export class RegisterComponent implements OnInit {
  // frmRegister;
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmitRegister(data: any): void {
    this.authService.createUser(data.usuario, data.email, data.password);
  }
}
