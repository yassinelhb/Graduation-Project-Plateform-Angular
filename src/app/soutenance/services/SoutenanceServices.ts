import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Soutenance } from '../entities/Soutenance';


@Injectable({
    providedIn: 'root'
  })
  export class SoutenanceService {
    constructor(private httpClient:HttpClient) { }
    getSoutenance(){
      return this.httpClient.get<Soutenance[]>(
          'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance/soutenance'
      );}

      addSoutenance(Soutenance){
        const httpOptions = {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        return this.httpClient.post<Soutenance>(
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance',Soutenance,httpOptions
          
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance'+Soutenance,httpOptions

        )}


        deleteSoutenance(id_soutenance) {
          return this.httpClient.delete(
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance?id='+id_soutenance
        );}
          
        GetSoutenanceById(id_soutenance) {
          return this.httpClient.get<Soutenance>(
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance/GetSoutenanceById?id='+id_soutenance
        );}   
          
        ModifierSoutenance(id_soutenance,soutenance){
          const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
          return this.httpClient.post<Soutenance>(
            'http://localhost:9080/4twin3-osp-pfe-web/rest/soutenance/modify/'+id_soutenance,soutenance,httpOptions
            
          )}
      }
  
