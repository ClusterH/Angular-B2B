import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  formatMoney(amount: string) {
    
    return ( amount.substring(3, amount.length + 1) ).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "ETB";
  }


}
