import {Component, Inject} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ModalService} from "../modal.service";
import {UpdateService} from "../update.service";
import {AuthService} from "../auth.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrl: './create-reservation.component.scss'
})
export class CreateReservationComponent {
  currentDate: Date = new Date();
  endDate: any;
  libraryId: any;
  bookId: any;
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
    if (!this.authService.isAuthenticated())
    {
      this.router.navigate(['/Login'])
    }
    this.libraryId = this.data.libraryId
    this.bookId = this.data.bookId;
  }
  updateButtonState() {
    if(this.endDate != null){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }
  onPress(){
    const data = { reservetimestart: this.currentDate, reservetimeend: this.endDate };
    this.apiService.createReservation(data, this.libraryId, this.bookId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.updateService.triggerHeaderUpdate();
      this.router.navigate([this.router.url]);
    });
  }
}
