import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UapiService {

  private url : string = "http://68.183.136.9:9738/api/u";
  
  constructor(private httpClient: HttpClient) {
    
  }

  public postShoppingList(data) {
    
    return this.httpClient.post(this.url + '/shop', data, {});
    
  }

}
