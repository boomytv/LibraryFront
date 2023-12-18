import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridsterModule } from 'angular-gridster2';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FooterComponent } from './footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CreateLibraryComponent } from './create-library/create-library.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { CreateReservationComponent } from './create-reservation/create-reservation.component';
import { EditLibraryComponent } from './edit-library/edit-library.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { WorkerBooksComponent } from './worker-books/worker-books.component';
import { AdminLibrariesComponent } from './admin-libraries/admin-libraries.component';
import { BookComponent } from './book/book.component';
import { LibraryComponent } from './library/library.component';
import { ReservationComponent } from './reservation/reservation.component';
import { BooksComponent} from "./books/books.component";
import { ReservationsComponent } from "./reservations/reservations.component";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MainPageComponent,
    FooterComponent,
    CreateLibraryComponent,
    CreateBookComponent,
    CreateReservationComponent,
    EditLibraryComponent,
    EditBookComponent,
    EditReservationComponent,
    WorkerBooksComponent,
    AdminLibrariesComponent,
    BookComponent,
    LibraryComponent,
    ReservationComponent,
    BooksComponent,
    ReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    ToastModule,
    MatTableModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [
    provideClientHydration(),
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
