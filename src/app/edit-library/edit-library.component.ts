import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ModalService} from "../modal.service";
import {AuthService} from "../auth.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-edit-library',
  templateUrl: './edit-library.component.html',
  styleUrl: './edit-library.component.scss'
})
export class EditLibraryComponent {
  name: any;
  street: any;
  phone: any;
  director: any;
  libraryId: any;
  library:any
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
    if(!this.authService.isAdmin()){
      this.router.navigate(['/Login']);
    }

    this.libraryId = this.data.libraryId;
    console.log(this.data.libraryId);

    this.apiService.getLibrary(this.libraryId).subscribe((data) => {
      this.library = data;
      this.name = this.library.name;
      this.street = this.library.street;
      this.phone = this.library.phone;
      this.director = this.library.director;
      this.updateButtonState();
      this.initialized = true;
    });
  }

  updateButtonState() {
    if(this.name != null && this.name.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }

  onPress(){
    const data = { name: this.name, street: this.street, phone: this.phone, director: this.director };
    this.apiService.editLibrary(data, this.libraryId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.router.navigate([this.router.url]);
      this.modalService.closeModal();
    });
  }
}
