export class PassengerModel {
    first_name: string;
    loyality_card: LoyalityCard = new LoyalityCard();
    last_name: string;
    middle_name: string;
    nationality: string;
    pass_number: string;
    pass_exp: string = null;
    gender: string;
    birthday: any;
    type: string;
    name_title: string;
    age_category: string;
}

export class LoyalityCard {
    SupplierCode: string = 'ET';
    CardNumber: string = '';
    SupplierType: string = 'Air';
}

export class MainPassengerModel {
    loyality_card: LoyalityCard = new LoyalityCard();
    first_name: string = null;
    last_name: string = null;
    middle_name: string = null;
    nationality: string = 'UA';
    pass_number: string = null;
    pass_exp: string = null;
    gender: string = null;
    birthday: any = null;
    phone_number: string = null;
    email_address: string = null;
    company: {
        name: null,
        tinNumber: null
    };
    type: string = 'ADT'
    name_title: string;
    age_category: string;
}
