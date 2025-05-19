import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from './model/model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private http:HttpClient) { }

  public deleteCustomer(id:String) {
    return this.http.delete("http://localhost:8080/clients/delte"+id);
  }

  // @ts-ignore
  public searchCustomer( Keyword:String) : Observable<Array<Customer>>{
    return this.http.get<Array<Client>>("http://localhost:8080/clients/search_customer?keyword="+Keyword);
  }
  public createCustomer(client: Client) : Observable<Client>{
    return this.http.post<Client>("http://localhost:8080/clients/save",client);
  }
}
