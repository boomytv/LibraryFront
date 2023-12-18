import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthService} from "../auth.service";
import {ModalService} from "../modal.service";
import {UpdateService} from "../update.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  libraryId: any;
  bookId: any;
  book: any;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService : AuthService,
              private modalService : ModalService,
              private updateService : UpdateService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

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

    this.libraryId = this.data.libraryId;
    this.bookId = this.data.bookId;

    this.apiService.getBook(this.libraryId, this.bookId).subscribe((data) => {
      this.book = data;
      this.initialized = true;
    });
  }

  onEditClick(){
    this.modalService.closeModal();
    this.modalService.openEditBook(this.bookId, this.libraryId);
  }

  onDeleteClick(){
    this.apiService.deleteBook(this.libraryId, this.bookId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.updateService.triggerHeaderUpdate();
      this.router.navigate([this.router.url]);
    });
  }
}
