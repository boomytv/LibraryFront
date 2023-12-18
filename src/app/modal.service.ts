import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {LibraryComponent} from "./library/library.component";
import {CreateLibraryComponent} from "./create-library/create-library.component";
import {AdminLibrariesComponent} from "./admin-libraries/admin-libraries.component";
import {EditLibraryComponent} from "./edit-library/edit-library.component";
import {EditReservationComponent} from "./edit-reservation/edit-reservation.component";
import {CreateReservationComponent} from "./create-reservation/create-reservation.component";
import {ReservationComponent} from "./reservation/reservation.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {BookComponent} from "./book/book.component";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(public dialog: MatDialog) {}

  openLibraryModal(libraryId: any): void {
    const dialogRef = this.dialog.open(LibraryComponent, {
      width: '500px',
      height: '500px',
      data: { libraryId },
    });
  }
  openCreateLibrary(): void {
    const dialogRef = this.dialog.open(CreateLibraryComponent, {
      width: '500px',
      height: '500px',
    });
  }
  openEditLibrary(libraryId: any): void {
    const dialogRef = this.dialog.open(EditLibraryComponent, {
      width: '500px',
      height: '500px',
      data: { libraryId },
    });
  }
  openBookModal(bookId: any, libraryId: any): void {
    const dialogRef = this.dialog.open(BookComponent, {
      width: '500px',
      height: '500px',
      data: { bookId, libraryId },
    });
  }
  openCreateBook(libraryId: any): void {
    const dialogRef = this.dialog.open(CreateBookComponent, {
      width: '500px',
      height: '500px',
      data: { libraryId },
    });
  }
  openEditBook(bookId: any, libraryId: any): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      width: '500px',
      height: '500px',
      data: { bookId, libraryId },
    });
  }
  openReservationModal(reservationId: any, bookId: any, libraryId: any): void {
    const dialogRef = this.dialog.open(ReservationComponent, {
      width: '500px',
      height: '500px',
      data: { reservationId, bookId, libraryId },
    });
  }
  openCreateReservation(bookId: any ,libraryId: any): void {
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: '500px',
      height: '500px',
      data: { bookId ,libraryId },
    });
  }
  openEditReservation(reservationId: any, bookId: any, libraryId: any): void {
    const dialogRef = this.dialog.open(EditReservationComponent, {
      width: '500px',
      height: '500px',
      data: { reservationId, bookId, libraryId },
    });
  }
  closeModal(): void {
    this.dialog.closeAll();
  }
}
