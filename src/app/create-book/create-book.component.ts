import {Component, Inject} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ModalService} from "../modal.service";
import {UpdateService} from "../update.service";
import {AuthService} from "../auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {
  title: any;
  author: any;
  publisher: any;
  libraryId: any;
  isButtonDisabled: boolean = true;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private updateService: UpdateService,
              private authService: AuthService,
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
    this.libraryId = this.data.libraryId
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
    this.apiService.createBook(data, this.libraryId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.updateService.triggerHeaderUpdate();
      this.router.navigate([this.router.url]);
    });
  }
}
