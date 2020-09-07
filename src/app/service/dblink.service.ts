import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DblinkService {

server: string;


  constructor(
    private http: HttpClient,
    private authService: AuthService) { 
      this.server = this.authService.server;
    }

    postData(body, file){
let type = 'application/json; charset=utf-8';
let headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
let options = {headers:headers};

        return this.http.post(this.server + file, JSON.stringify(body), options);
        //.map(res => res.json());
    }

} 
