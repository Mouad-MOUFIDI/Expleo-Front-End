import { Conge } from 'src/app/conge';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CongeServiceService {
  private congeUrl: string;

  constructor(private http: HttpClient) {
    this.congeUrl = "/api/";
   }
   public save(conge: Conge){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(conge);
    console.log(body)
     return this.http.post<Conge>(this.congeUrl+'conge', body,{'headers':headers});
   }
   public getConges():Observable<Conge[]>{
     console.log('[getConge]'+this.congeUrl+'conges')
     return this.http.get<Conge[]>(this.congeUrl+'conges')
   }
}
