import { Component } from '@angular/core';
import {ApiService} from "../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {ModalService} from "../modal.service";
import {UpdateService} from "../update.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-create-library',
  templateUrl: './create-library.component.html',
  styleUrl: './create-library.component.scss'
})
export class CreateLibraryComponent {

  name: any;
  street: any;
  phone: any;
  director: any;
  isButtonDisabled: boolean = true;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private updateService: UpdateService,
              private authService: AuthService ) {}

  ngOnInit(): void {
    if(!this.authService.isAdmin() || !this.authService.isWorker()){
      this.router.navigate(['/Login']);
    }
  }
  updateButtonState() {
    if(this.name != null && this.name.length != 0 && this.street != null && this.street.length != 0 && this.phone != null && this.phone.length != 0 && this.director != null && this.director.length != 0){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }
  onPress(){
    const data = { name: this.name, street: this.street, phone: this.phone, director: this.director };
    this.apiService.createLibrary(data).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.updateService.triggerHeaderUpdate();
      this.router.navigate([this.router.url]);
    });
  }
}
