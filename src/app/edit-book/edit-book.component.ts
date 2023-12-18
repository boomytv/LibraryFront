import {Component, Inject} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthService} from "../auth.service";
import {ModalService} from "../modal.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {
  title: any;
  author: any;
  publisher: any;
  libraryId: any;
  bookId: any;
  book:any
  isButtonDisabled: boolean = true;
  initialized: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService: AuthService,
              private modalService: ModalService,
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
      this.title = this.book.title;
      this.author = this.book.author;
      this.publisher = this.book.publisher;
      this.updateButtonState();
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.title != null && this.title.length != 0 && this.author != null && this.author.length != 0 && this.publisher != null && this.publisher.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    const data = { title: this.title, author: this.author, publisher: this.publisher };
    this.apiService.editBook(data, this.libraryId, this.bookId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.router.navigate([this.router.url]);
      this.modalService.closeModal();
    });
  }
}
