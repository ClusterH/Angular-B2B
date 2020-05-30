import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  
  private _airportJsonURL = 'assets/json/flight_city_with_airport.json';
  private _airportShortCodeMapURL = 'assets/json/airportShortcodeToCityMap.json';
  private _airports = 'assets/json/carriers.json';

  constructor(private http: HttpClient) { }

  public getAirports(): Observable<any> {
    return this.http.get(this._airportJsonURL);
  }

  public getAirportMapped() : Observable<any>{
    
    return this.http.get(this._airportShortCodeMapURL)
  }

  public getCarriers() : Observable<any>{
    
    return this.http.get(this._airports)
  }
}
