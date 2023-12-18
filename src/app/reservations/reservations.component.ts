import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthService} from "../auth.service";
import {ModalService} from "../modal.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {
  books: any[] = [];
  libraries: any[] = [];
  reservations: any[] = [];
  library: any;
  libraryId: any;
  bookId: any;
  book: any;
  initialized: boolean = false;
  displayedColumns: string[] = ['reservetimestart', 'reservetimeend'];
  data!: MatTableDataSource<any>;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {
  }
  ngOnInit(): void {
    if (!this.authService.isAuthenticated())
    {
      this.router.navigate(['/Login'])
    }
    // Fetch the list of libraries when the component initializes
    this.fetchLibraries();

  }


  fetchLibraries() {
    // Call your library service to get the list of libraries
    // This is a placeholder; you should replace it with your actual service method
    this.apiService.getAllLibraries().subscribe(
      (libraries: any[]) => {
        this.libraries = libraries;
      },
      (error) => {
        console.error('Error fetching libraries:', error);
      }
    );
  }
  getBooksInLibrary() {
    if (this.libraryId !== null) {
      this.apiService.getAllBooks(this.libraryId).subscribe(
        (books: any[]) => {
          this.books = books;
          // Process the books as needed
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    } else {
      this.book = null;
      this.reservations = [];
    }
  }
  getReservationsInBook() {
    if (this.libraryId !== null) {
      this.apiService.getAllReservations(this.libraryId, this.bookId).subscribe(
        (reservations: any[]) => {
          this.reservations = reservations;
          this.data = new MatTableDataSource(reservations);
          this.initialized = true;
          // Process the books as needed
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    } else {
      console.warn('Please select a library before getting books.');
    }
  }

  navigateToReservation(reservation:any): void {
    this.modalService.closeModal();
    this.modalService.openReservationModal(reservation.id, this.bookId, this.libraryId);
  }
  navigateToCreateReservation(): void {
    this.modalService.closeModal();
    this.modalService.openCreateReservation(this.bookId, this.libraryId);
  }
}
