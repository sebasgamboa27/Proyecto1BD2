import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}


  //Este es un ejemplo de peticion al API, estas son las funciones para pedirle al API que traiga cosas, o que haga cosas

  async insertLocation(id:string,lat:string,lng:string,province:string,canton:string,status:string,feeback:string) {
    return await fetch(`http://localhost:3000/vigilantee/alertme/log/${id}/${lat}/${lng}/${canton}/${province}/${status}/${feeback}`, {mode:'no-cors'})
    //return await this.http.post<any[]>(`http://localhost:3000/vigilantee/alertme/log/${id}/${lat}/${lng}/${canton}/${province}/${status}/${feeback}`,{}).toPromise();
  }

}
