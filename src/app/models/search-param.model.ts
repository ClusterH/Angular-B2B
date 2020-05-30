export class SearchParamModel {
    legs?: LegModel[] = [];
    passengers?: PassengerModel = new PassengerModel();
    cabins?: string[] = [];
    maxSolutions = 200;
    pricing?: PricingModel = new PricingModel();
    eFilterType: any;
}

export class LegModel {
    from?: string = null;
    to?: string = null;
    departureDate?: string;
}

export class PassengerModel {
    ADT = 0;
    CNN = 0;
    INF = 0;
}

export class PricingModel {
    currency?: string = null;
    eTicketability = 'Yes';
}
