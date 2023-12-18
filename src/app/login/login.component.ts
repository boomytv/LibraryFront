import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit  {
  isButtonDisabled: boolean = true;
  username!: string;
  password!: string;
  authenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private updateService: UpdateService) {}

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/Reservations']);
    }
  }

  updateButtonState() {
    if(this.username != null && this.password != null && this.username.length != 0 && this.password.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      (data) => {
        const tokens = { accessToken: data.accessToken, refreshToken: data.refreshToken };
        this.authService.setTokens(tokens);
        this.router.navigate(['/Reservations']);
      },
      (error) => {
        if(error.status === 400){
          this.toastr.error('Wrong username or password');
        }
      }
    );
  }

}

