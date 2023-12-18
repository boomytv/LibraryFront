import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';
  //http://localhost:5106/api
  //https://clownfish-app-9ilam.ondigitalocean.app/api

  constructor(private http: HttpClient) {}

  getAllLibraries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/libraries`);
  }

  getLibrary(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}`);
  }

  createLibrary(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/library`, data);
  }

  editLibrary(data: any, id:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/library/${id}`, data);
  }

  deleteLibrary(id:number){
    return this.http.delete(`${this.apiUrl}/library/${id}`);
  }

  getAllReservations(id:number, auctionId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}/book/${auctionId}/reservations`);
  }

  getReservation(id:number, bookId:number, resId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}/book/${bookId}/reservation/${resId}`);
  }

  createReservation(data: any, id:number, resId:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/library/${id}/book/${resId}/reservation`, data);
  }

  editReservation(data: any, id:number, bookId:number, resId:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/library/${id}/book/${bookId}/reservation/${resId}`, data);
  }

  deleteReservation(id:number, bookId:number, resId:number){
    return this.http.delete(`${this.apiUrl}/library/${id}/book/${bookId}/reservation/${resId}`);
  }

  getAllBooks(id:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}/books`);
  }

  getBook(id:number, bookId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/library/${id}/book/${bookId}`);
  }

  createBook(data: any, id:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/library/${id}/book`, data);
  }

  editBook(data: any, id:number, bookId:number): Observable<any> {
    return this.http.put(`${this.apiUrl}/library/${id}/book/${bookId}`, data);
  }
  deleteBook(id:number, bookId:number){
    return this.http.delete(`${this.apiUrl}/library/${id}/book/${bookId}`);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/signin`, data);
  }
}
