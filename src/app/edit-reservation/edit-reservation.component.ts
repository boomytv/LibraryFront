import {Component, Inject} from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthService} from "../auth.service";
import {ModalService} from "../modal.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrl: './edit-reservation.component.scss'
})
export class EditReservationComponent {
  endDate: any;
  libraryId: any;
  bookId: any;
  reservationId: any;
  reservation:any
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
    if (!this.authService.isAuthenticated())
    {
      this.router.navigate(['/Login'])
    }

    this.libraryId = this.data.libraryId;
    this.bookId = this.data.bookId;
    this.reservationId = this.data.reservationId;

    this.apiService.getReservation(this.libraryId, this.bookId, this.reservationId).subscribe((data) => {
      this.reservation = data;
      this.endDate = this.reservation.endDate;
      this.updateButtonState();
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.endDate != null){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    const data = { reservetimeend: this.endDate };
    this.apiService.editReservation(data, this.libraryId, this.bookId, this.reservationId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.router.navigate([this.router.url]);
      this.modalService.closeModal();
    });
  }
}
