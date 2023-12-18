import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-admin-libraries',
  templateUrl: './admin-libraries.component.html',
  styleUrl: './admin-libraries.component.scss'
})
export class AdminLibrariesComponent implements OnInit {
  libraries: any[] = [];
  initialized: boolean = false;
  displayedColumns: string[] = ['name', 'phone', 'director'];
  data!: MatTableDataSource<any>;

  ngOnInit() {
    if (!this.authService.isAdmin() && this.authService.isAuthenticated())
    {
      this.router.navigate(['/UserReservations']);
    } else if (!this.authService.isAuthenticated())
    {
      this.router.navigate(['/Login'])
    }

    this.apiService.getAllLibraries().subscribe((response) => {
      this.libraries = response;
      this.data = new MatTableDataSource(response);
      this.initialized = true;
    });

  }

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private authService: AuthService) {}

  navigateToLibrary(library:any): void {
    this.modalService.closeModal();
    this.modalService.openLibraryModal(library.id);
  }
  navigateToCreateLibrary(): void {
    this.modalService.closeModal();
    this.modalService.openCreateLibrary();
  }
}
