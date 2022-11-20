import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PisosService {

  private API_SERVER = "http://localhost:8080/piso/";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllPisos(): Observable<any> {
    return this.httpClient.get(this.API_SERVER);
  }
}
