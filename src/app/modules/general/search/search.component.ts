import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { GlobalService } from 'src/app/services/global.service';
import { UapiService } from 'src/app/services/http/uapi.service';
import { FlightSearchResultModel, FlightSearchItemModel } from 'src/app/models/search-result.model';
import { AirportsService } from 'src/app/services/airports.service';

import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrencyService } from 'src/app/services/currency.service';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { of, Subscription, Subject, interval } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([0, 0])
  });

  options: Options = {
    floor: 0,
    ceil: 99999
  };
  direct: boolean = false;
  one_stop: boolean = false;
  two_stop: boolean = false;

  airline1: boolean = true;
  airline2: boolean = false;
  airline3: boolean = true;
  airline4: boolean = true;
  airline5: boolean = false;
  airline6: boolean = false;

  flightSearchResult: FlightSearchResultModel[];
  flightSearchResultBkp: FlightSearchResultModel[];
  airlines: any[] = [];
  airports: any = [];
  carriers: any = [];

  checkedOrUnchecked: boolean = false;
  public departureAirportObj;
  public arrivalAirportObj;
  public flightType;

  //Price
  public minimumTicketPrice: number = 0;
  public maximumTicketPrice: number = 0;

  //Pagination
  page: number = 1;
  pageSize: number = 5;

  //Async-For-Flight-Search-Result-Filter
  sub: Subscription;
  manualTimer$: Observable<number> = interval(1000);

  //Flight Selection
  public selectedOutboundFlightIndex : number;
  public selectedOutBoundFlight : any;

  public selectedInBoundFlight : any;
  public selectedInboundFlightIndex : number;
  public selectedFlight : any;


  constructor(private globalService: GlobalService, private uapiService: UapiService, public airportService: AirportsService,
    private currencyService: CurrencyService, private cdRef: ChangeDetectorRef) {

    this.airportService.getAirports().subscribe(data => {
      this.airports = data
    })

    this.airportService.getCarriers().subscribe(data => {
      this.carriers = data;
    })

    this.sub = this.manualTimer$.subscribe(() => {
      this.cdRef.markForCheck(); // Bad
    });
  }


  ngOnInit(): void {

    this.departureAirportObj = this.globalService.getDepartureSearchLocation();
    this.arrivalAirportObj = this.globalService.getArrivalSearchLocation();

    // Return either one-way , return or multi-city
    this.flightType = this.globalService.getFlightType();
    this.getShopping(this.globalService.getSearchParams())

  }

  async getShopping(searchParams) {

    this.uapiService.postShoppingList(searchParams)
      .subscribe((resp: any) => {

        this.flightSearchResult = (resp)
        this.flightSearchResultBkp = (resp);

        this.extractAirlines(resp);
        this.extractTicketPrices(resp);
      })
  }

  formatMoney(amount: string) {
    return this.currencyService.formatMoney(amount);
  }

  extractAirlines(flightResult) {
    flightResult.forEach(flight => {
      if (flight.directions && flight.directions.length > 0) {

        let carrier = flight.directions[0][0].platingCarrier
        this.airlines.push({ 'iatacode': carrier, 'checked': false })
      }
    });

    this.airlines = (Array.from(new Set(this.airlines.map(item => item.iatacode)))).map(airline => {
      return { 'iatacode': airline, 'checked': false }
    })
  }

  extractTicketPrices(flightResult) {

    flightResult.forEach(flight => {

      if (flight.totalPrice) {
        let price = Number(flight.totalPrice.replace(/[^0-9]/g, ''))

        if (this.minimumTicketPrice == 0 && price > 0) {
          this.minimumTicketPrice = price
        }

        if (this.maximumTicketPrice == 0) {
          this.maximumTicketPrice = price
        }

        if (this.minimumTicketPrice > price) {
          this.minimumTicketPrice = price
        }

        if (this.maximumTicketPrice < price) {
          this.maximumTicketPrice = price
        }
      }

    })

    this.options.ceil = this.maximumTicketPrice
    this.options.floor = this.minimumTicketPrice

    this.sliderForm.reset({ sliderControl: [this.minimumTicketPrice, this.maximumTicketPrice] });

  }

  formatToTime(dateTime) {
    return moment(dateTime).format('HH:mm')
  }

  formatToDay(dateTime) {
    return moment(dateTime).format('dddd , MMMM DD, YYYY')
  }

  getFlightType(segments) {
    if (segments.length == 1) {
      return "Direct"
    } else if (segments.length == 2) {
      return "1 Stop"
    } else if (segments.length > 2) {
      return "2 Stops"
    } else {
      return ""
    }
  }

  getAirportFullName(IATACode) {
    let airport = this.airports.find(airport => airport.IATACode === IATACode)
    if (airport) {
      return airport.airport + " (" + airport.IATACode + ")"
    } else {
      return ""
    }
  }

  getDepartureDate() {
    let departure = (this.globalService.getSearchParams()).legs[0].departureDate

    return this.formatToDay(departure);
  }

  getArrivalDate() {

    let arrival = (this.globalService.getSearchParams()).legs[(this.globalService.getSearchParams()).legs.length - 1].departureDate

    return this.formatToDay(arrival)

  }

  getCarrierName(carrierIATACode) {

    let carrierFound = this.carriers.find(carrier => carrier.carrier_code === carrierIATACode)

    if (carrierFound) {
      return carrierFound.carrier_name1
    } else {
      return carrierIATACode
    }

  }

  priceSliderValueChanged(value: number): void {
    //ToDo : Filter FlightSearchResult
  }

  checkAirlines() {
    console.log(this.airlines)
  }

  airlineCheckmarkTapped(carrier, c, event) {
    console.log(carrier)
  }

  selectOutBoundFlight(outboundFlight , outboundFlightIndex){
    this.selectedOutboundFlightIndex = outboundFlightIndex
    this.selectedOutBoundFlight = outboundFlight
    
  }

  selectInBoundFlight(inboundFlight, inboundFlightIndex,parentFlight) {
      this.selectedInboundFlightIndex = inboundFlightIndex
      this.selectedInBoundFlight = inboundFlight

      this.selectedFlight = parentFlight
      console.log(this.selectedFlight.totalPrice)
  }

  compareSegments(inboundFlight, selectedFlight) {
    
    let flag : boolean = true;
    (inboundFlight.segments).forEach( (inbound,idx) => {
        if(inbound.uapi_segment_ref !== (selectedFlight.segments)[idx].uapi_segment_ref){
          flag = false
        }
    });
    return flag;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  //Filter : ToDo ::: Filter By LayOver , Airline , Price
  directFlightFilterChange(event) {
    this.filter()
  }

  oneStopFlightFilterChange(event) {
    this.filter()
  }

  twoStopFlightFilterChange(event) {
    this.filter()
  }

  filter() {

    this.flightSearchResult = this.flightSearchResultBkp
    
    //Filter : LayOver
    this.flightSearchResult = this.flightSearchResult.filter(flight => {

      //LayOver Filters
      let flag, flag2, flag3 = false;
      if (this.direct)
        flag = this.filterWithLayovers('Direct', flight)

      if (this.one_stop)
        flag2 = this.filterWithLayovers('1 Stop', flight)

      if (this.two_stop)
        flag3 = this.filterWithLayovers('2 Stops', flight)

      //No Filter Applied
      if (!this.direct) {
        if (!this.one_stop) {
          if (!this.two_stop) {
            return true
          }
        }
      }
      return (flag || flag2 || flag3);


    });


    //Filter : Airline
    this.flightSearchResult = this.flightSearchResult.filter( flight => {

      //Airline Filters
      let flag4 , updateFlag = false;
      
      //Just For Checking
      if(flight.directions.length > 0){

          let platingCarrier = flight.directions[0][0].platingCarrier;
          this.airlines.forEach ( airline => {
            if( airline.checked && (platingCarrier === airline['iatacode']) ){
                flag4 = true
            }

          })

      }

      this.airlines.forEach( airline => {
          if(airline.checked){
            updateFlag = true
          }
      })

      // No Airline Filter Applied
      if(!updateFlag){
          return true
      }

      return flag4

    })

  }

  filterWithLayovers(layOverType: string, flight: FlightSearchResultModel) {

    let flag: boolean = true;
    //OutBound
    if (flight.directions[0]) {

      flight.directions[0].forEach(outbound => {
        if (this.getFlightType(outbound.segments) !== layOverType) {
          flag = false
        }
      })

    }

    //InBound
    if (flight.directions.length > 1) {

      flight.directions[1].forEach(outbound => {
        if (this.getFlightType(outbound.segments) !== layOverType) {
          flag = false
        }
      })

    }

    return flag
  }

  airlineFilterChange(airlineFilterStatus, index) {
    
    this.airlines[index].checked = airlineFilterStatus
    this.filter()
  }

  ngOnDestroy() {
    // To avoid memory leaks, very easy to forget
    // Another reason to use async pipe - it unsubs automatically when component is destroyed
    this.sub.unsubscribe();
  }
}
