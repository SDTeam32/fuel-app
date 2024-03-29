export interface QuoteInput {
    id?: number; // Optional if it's being created and doesn't have an ID yet
    dateCreated?: string; // Optional if it's being created and doesn't have a date yet
    gallonsReq: number
    deliveryAddr?: string
    deliveryDate?: string
    sugPrice: number
    totalPrice: number
    // any other properties needed for a quote
}