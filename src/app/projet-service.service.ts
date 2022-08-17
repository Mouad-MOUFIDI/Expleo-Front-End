import { Projet } from './projet';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {
  private projetUrl: string;

  constructor(private http: HttpClient) {
    this.projetUrl = "http://localhost:8080/";
   }
   public save(projet: Projet){
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(projet);
    console.log(body)
     return this.http.post<Projet>(this.projetUrl+'projet', body,{'headers':headers});
   }
   public getProjets():Observable<Projet[]>{
     console.log('getProjet'+this.projetUrl+'projets')
     return this.http.get<Projet[]>(this.projetUrl+'projets')
   }
}
