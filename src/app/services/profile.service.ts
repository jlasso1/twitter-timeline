import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private backendUrl: string;
  private idUser: string;
  private name:string;
  private count:string;
  private httpOptions = {
		headers: new HttpHeaders(),
		params: new HttpParams()
  }
  constructor(private http: HttpClient) { 
    this.backendUrl = environment.MS_TRANSACTION;
    this.idUser = environment.ID_USUARIO;
    this.name = environment.NAME;
    this.count = environment.COUNT;
    this.httpOptions.headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
    })
  }

  getTimeLine():Observable<any> {
    this.httpOptions.params = this.httpOptions.params.set("screen_name",this.name);
    this.httpOptions.params = this.httpOptions.params.set("count",this.count);
    return this.http.get<any>(`${this.backendUrl}/profile/v1/twitter`,
            this.httpOptions);
  }

  getProfile():Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/profile/v1/user/`+this.idUser);
  }

  updateProfile(body:any):Observable<any> {
    return this.http.patch<any>(`${this.backendUrl}/profile/v1/user/`+this.idUser,body);
  }

}
