import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { UpdateService } from '../update.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  libraries: any;
  authenticated: boolean = false;
  initialized: boolean = false;
  isAdmin = false;
  isWorker = false;
  mySubscription: any;
  private subscription: Subscription;

  constructor(private apiService: ApiService, private router: Router, private authService: AuthService, private el: ElementRef, private updateService: UpdateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

    this.subscription = this.updateService.headerUpdate$.subscribe(() => {
      this.initialized = false;
      if(this.authService.isAdmin()){
        this.isAdmin = true;
      }
      if (this.authService.isWorker())
      {
        this.isWorker = true;
      }

      if(this.authService.isAuthenticated()){
        this.authenticated = true;
      }

    });
  }

  ngOnInit(): void {
    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }

    if(this.authService.isWorker())
    {
      this.isWorker = true;
    }

    if(this.authService.isAuthenticated()){
      this.authenticated = true;
    }

  }

  ngOnDestroy(){
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
    this.subscription.unsubscribe();
  }


  navigateToLibraries(): void {
    this.router.navigate(['/Libraries']);
  }
  navigateToBooks(): void {
    this.router.navigate(['/Books'])
  }
  navigateToReservations(): void {
    this.router.navigate(['/Reservations'])
  }
  navigateToLogin(): void {
    this.router.navigate(['/Login']);
  }


  logout(): void {
    this.authService.logout();

    this.initialized = false;
    this.isAdmin = false;
    this.isWorker = false;
    this.authenticated = false;
    this.router.navigate(['/Login'])
  }
}
