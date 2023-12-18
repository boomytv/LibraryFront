import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UpdateService} from "../update.service";
import {ModalService} from "../modal.service";
import {AuthService} from "../auth.service";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  libraryId: any;
  library: any;
  initialized: boolean = false;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService,
              private route: ActivatedRoute,
              private router: Router,
              private datePipe: DatePipe,
              private authService : AuthService,
              private modalService : ModalService,
              private updateService : UpdateService,
              @Inject(MAT_DIALOG_DATA) public data: any ) {}

  ngOnInit(): void {

    if(this.authService.isAdmin()){
      this.isAdmin = true;
    }else{
      this.router.navigate(['/Login']);
    }

    this.libraryId = this.data.libraryId;

    this.apiService.getLibrary(this.libraryId).subscribe((data) => {
      this.library = data;
      this.initialized = true;
    });
  }

  onEditClick(){
    this.modalService.closeModal();
    this.modalService.openEditLibrary(this.libraryId);
  }

  onDeleteClick(){
    this.apiService.deleteLibrary(this.libraryId).subscribe(response => {
      // this.router.navigate(['/Categories']).then(() => {
      //   window.location.reload();
      // });
      this.modalService.closeModal();
      this.updateService.triggerHeaderUpdate();
      this.router.navigate([this.router.url]);
    });
  }
}
