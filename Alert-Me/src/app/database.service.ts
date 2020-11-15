import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}


  //Este es un ejemplo de peticion al API, estas son las funciones para pedirle al API que traiga cosas, o que haga cosas

  async ejemploDePeticionAlAPI(lat:string,lng:string,province:string,canton:string) {
    return await this.http.post<any[]>(`localhost:3000/vigilantee/alertme/log/hola/mundo/Naranjo/Province/entero/perras`,{}).toPromise();
  }

}