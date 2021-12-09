import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covid } from '../home/covid.inteface';
import { Pacientes } from '../registrar/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  public pacientes$: Observable<Pacientes>;

  constructor(private http: HttpClient) { }
  url = 'https://api.covidtracking.com/v1/us/current.json';
  public clima: any;


  getClima(): Observable<Covid[]> {
    return this.http.get<Covid[]>(`${this.url}`);
  }
}
