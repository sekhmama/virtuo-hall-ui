import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  public vedioSrc = '';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  writeServer(body: any){
    return this.http.post(`${this.apiUrl}/users/dummy`, body);
  }
}
