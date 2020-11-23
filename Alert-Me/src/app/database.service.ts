import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';
import {Constants} from 'src/common/index'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}


  async insertLocation(id : string, lat : string, lng : string, province : string, canton : string, status : number, feeback : number) {
    return await fetch(`http://${Constants.SEBAS_NETWORK_IP}/vigilantee/alertme/log/${id}/${lat}/${lng}/${canton}/${province}/${status}/${feeback}`, {mode:'no-cors', method:'POST'})
  }

}
