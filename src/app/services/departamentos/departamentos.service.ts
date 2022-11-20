import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private API_SERVER = "http://localhost:8080/departamento/";

  constructor(private httpClient: HttpClient) { }

  public getAllDepartamentosByPiso(idPiso: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER + idPiso);
  }

}
