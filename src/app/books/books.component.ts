import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ModalService} from "../modal.service";
import {AuthService} from "../auth.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent {
  books: any[] = [];
  libraries: any[] = [];
  library: any;
  libraryId: any;
  initialized: boolean = false;
  adminRole: boolean = false;
  displayedColumns: string[] = ['title', 'author', 'publisher'];
  data!: MatTableDataSource<any>;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService ) {
  }
  ngOnInit(): void {
    if (!this.authService.isWorker())
    {
      if(!this.authService.isAdmin())
      {
        this.router.navigate(['/UserReservations']);
      }
    }
    else if (!this.authService.isAuthenticated())
    {
      this.router.navigate(['/Login'])
    }
    // Fetch the list of libraries when the component initializes
    this.fetchLibraries();
  }

  fetchLibrary(id: any) {
    this.apiService.getLibrary(id).subscribe(
      (library: any[]) => {
        this.library = library;
      },
      (error) => {
        console.error('Error fetching libraries:', error);
      }
    );
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
          this.data = new MatTableDataSource(books);
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

  navigateToBook(book:any): void {
    this.modalService.closeModal();
    console.log(book.id)
    this.modalService.openBookModal(book.id, this.libraryId);
  }
  navigateToCreateBook(): void {
    this.modalService.closeModal();
    this.modalService.openCreateBook(this.libraryId);
  }
}
