import { Injectable } from '@angular/core';
import { SearchParamModel } from '../models/search-param.model';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private mSearchParams: SearchParamModel;
  constructor() { }

  setSearchParams(params) {
    localStorage.setItem('searchParam', JSON.stringify(params));
  }

  getSearchParams() {
    return JSON.parse(localStorage.getItem('searchParam'));
  }

  setFlightType(flightType) {
    localStorage.setItem('flightType', (flightType));
  }

  getFlightType() {
    return localStorage.getItem('flightType');
  }

  setDepartureSearchLocation(departureLocation) {
    localStorage.setItem('departureLocation', JSON.stringify(departureLocation));
  }

  getDepartureSearchLocation() {
    return JSON.parse(localStorage.getItem('departureLocation'));
  }


  setArrivalSearchLocation(arrivalLocation) {
    localStorage.setItem('arrivalLocation', JSON.stringify(arrivalLocation));
  }

  getArrivalSearchLocation() {
    return JSON.parse(localStorage.getItem('arrivalLocation'));
  }

}
