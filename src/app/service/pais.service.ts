import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pais } from '../model/pais';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private urlBackend: string = 'http://localhost:3000';
  paises: Pais[] = [];

  constructor(private http: HttpClient) {}

  getAllCountries() {
    return this.http.get<Pais[]>(this.urlBackend + '/paises');
  }

  setPaises(paisList: Pais[]) {
    console.log('prueba', paisList);

    this.paises = paisList;
  }

  getPaises() {
    return this.paises;
  }

  deletePais(id: string) {
    return this.http.delete<Pais>(this.urlBackend + `/paises/${id}`);
  }

  addCountry(value: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.urlBackend + '/paises', value);
  }

  editCountry(value: any) {
    return this.http.put<Pais>(this.urlBackend + '/paises', value);
  }
}
