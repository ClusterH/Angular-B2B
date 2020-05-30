import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompleterService, CompleterData, CompleterItem } from 'ng2-completer';
import { AirportsService } from 'src/app/services/airports.service';
import { SearchParamModel, LegModel } from 'src/app/models/search-param.model';
import * as moment from 'moment';
import { GlobalService } from 'src/app/services/global.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  locations = [1];
  length = 1;

  public departureStr: string;
  public arrivalStr : string;
  public departureReturnStr : string;
  public arrivalReturnStr : string;
  public multiCityStr : any[] = [{"departure" : "","arrival": ""}];

  //Auto-Complte Airport Data-Service
  public dataService: CompleterData;
  
  // Store Selected Airport Obj ( Except Multi-City)
  private departureAirportObj;
  private arrivalAirportObj;

  // Except Multi-City
  public departureDate : Date;
  public returnDate : Date;

  //Passengers
  public adultPassengers : number = 1;
  public childPassengers : number = 0;
  public infantPassengers : number = 0;

  //Cabins
  public oneWayCabinClass : string = "Economy";
  public returnCabinClass : string = "Economy";
  public cabinClassAllowed : string[] = ["Economy","Business","First"]


  private mSearchParam = new SearchParamModel();

  constructor(public completerService: CompleterService, private airportService : AirportsService, private globalService : GlobalService) {
    localStorage.setItem('login', 'true');
    
      this.airportService.getAirports().subscribe(data => {
        this.dataService = completerService.local(data, 'city,IATACode,airport', 'fullName');
      });
   }

  

  ngOnInit(): void {
    console.log("child.....", localStorage.getItem('login'))
  }

  addLocation() {
    this.locations.push(1);
    this.length = this.locations.length;
    this.multiCityStr.push({"departure" : "","arrival": ""})
  } 
  
  removeLocation() {
    this.locations.pop();
    this.length = this.locations.length;
    this.multiCityStr.pop()
  }

  departureAirportSelected(selected:CompleterItem , isReturn : boolean = false){
    
    if(selected){
        this.departureAirportObj = selected
    }
  }

  arrivalAirportSelected(selected:CompleterItem , isReturn : boolean = false){

    if(selected){
        this.arrivalAirportObj = selected
    }
  }
  
  departureAirportSelectedMulti(selected : CompleterItem , index : number){
      console.log(selected , index)
  }

  arrivalAirportSelectedMulti(selected : CompleterItem , index : number){
    console.log(selected , index)
  }

  search(flightType : string){

    if(flightType === 'one-way'){

      const leg = new LegModel();
      leg.from = this.departureAirportObj.originalObject.IATACode
      leg.to = this.arrivalAirportObj.originalObject.IATACode
      leg.departureDate = moment(this.departureDate).format("YYYY-MM-DD");

      this.mSearchParam.legs.push(leg)
      this.mSearchParam.passengers.ADT = this.adultPassengers;
      this.mSearchParam.passengers.CNN = this.childPassengers;
      this.mSearchParam.passengers.INF = this.infantPassengers;

      this.mSearchParam.cabins.push(this.oneWayCabinClass)
      this.mSearchParam.pricing.currency = 'ETB';

      this.globalService.setSearchParams(this.mSearchParam)
      this.globalService.setDepartureSearchLocation(this.departureAirportObj)
      this.globalService.setArrivalSearchLocation(this.arrivalAirportObj)
      this.globalService.setFlightType('one-way')

      console.log(this.mSearchParam)

    }else if(flightType === 'return'){

      const outbound_leg = new LegModel();
      outbound_leg.from = this.departureAirportObj.originalObject.IATACode
      outbound_leg.to = this.arrivalAirportObj.originalObject.IATACode
      outbound_leg.departureDate = moment(this.departureDate).format("YYYY-MM-DD");
      this.mSearchParam.legs.push(outbound_leg)

      const inbound_leg = new LegModel()
      inbound_leg.from = this.arrivalAirportObj.originalObject.IATACode
      inbound_leg.to = this.departureAirportObj.originalObject.IATACode
      inbound_leg.departureDate = moment(this.returnDate).format("YYYY-MM-DD");
      this.mSearchParam.legs.push(inbound_leg)

      this.mSearchParam.passengers.ADT = this.adultPassengers;
      this.mSearchParam.passengers.CNN = this.childPassengers;
      this.mSearchParam.passengers.INF = this.infantPassengers;
      
      this.mSearchParam.cabins.push(this.returnCabinClass)
      this.mSearchParam.pricing.currency = 'ETB';

      this.globalService.setSearchParams(this.mSearchParam)
      this.globalService.setDepartureSearchLocation(this.departureAirportObj)
      this.globalService.setArrivalSearchLocation(this.arrivalAirportObj)
      
      this.globalService.setFlightType('return')

      console.log(this.mSearchParam)
      

    }else if(flightType === 'multi-city'){

    }else {

    }

  }


  //Cabin Class Select Element Change Update
  oneWayCabinOnChange(cabinClass){
    this.oneWayCabinClass = cabinClass
  }

  returnCabinOnChange(cabinClass){
    this.returnCabinClass = cabinClass
  }
  
}
