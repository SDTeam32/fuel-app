export interface QuoteInput {
    id?: number; // Optional if it's being created and doesn't have an ID yet
    user_id:number;
    dateCreated?: string; // Optional if it's being created and doesn't have a date yet
    gallonsReq: number
    deliveryAddr?: string
    deliveryDate?: string
    sugPrice: number
    totalPrice: number
    // any other properties needed for a quote
}

export interface Quote {
    id?: number; // Optional if it's being created and doesn't have an ID yet
    user_id:number;
    date_created?: string; // Optional if it's being created and doesn't have a date yet
    gallons_req: number
    delivery_addr?: string
    delivery_date?: string
    sug_price: number
    total_price: number
    // any other properties needed for a quote
}

export interface State {
    id: number
    state_name: string
    state_abbreviation: string
}

