export class FlightSearchResultModel {
    totalPrice: string;
    basePrice: string;
    taxes: string;
    directions: Direction[][];
    bookingComponents: BookingComponent[];
    passengerFares: PassengerFares;
    passengerCounts: PassengerCounts;
}

export class FlightAirAvailModel {
    legs: any;
    nextResultReference: string;
}

export class FlightSearchItemModel {
    parentIndex: number;
    totalPrice: string;
    basePrice: string;
    taxes: string;
    direction: Direction;
    passengerFares: PassengerFares;
    passengerCounts: PassengerCounts;
    airAvail: any;
    type: number;
}

export class Direction {
    platingCarriers: any;
    from: string;
    to: string;
    platingCarrier: string;
    segments: Segment[];
}

export class Segment {
    from: string;
    to: string;
    group: string;
    departure: any;
    arrival: string;
    airline: string;
    flightNumber: string;
    // uapi_segment_ref: string;
    serviceClass: string;
    plane: string[];
    duration: string[];
    techStops: string[];
    bookingClass: string;
    baggage: BaggageInfo[];
    fareBasisCode: string;
    transitTime: any;
    next: Segment;
}

export class BaggageInfo {
    units: string;
    amount: number;
}

export class BookingComponent {
    totalPrice: string;
    basePrice: string;
    taxes: string;
    // uapi_fare_reference: string;
}

export class PassengerFares {
    ADT: PassengerFareDetail;
    CNN: PassengerFareDetail;
    INF: PassengerFareDetail;
}

export class PassengerFareDetail {
    totalPrice: string;
    basePrice: string;
    taxes: string;
}

export class PassengerCounts {
    ADT: number;
    CNN: number;
    INF: number;
}
