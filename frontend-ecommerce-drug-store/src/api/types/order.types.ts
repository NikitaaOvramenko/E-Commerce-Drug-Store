
export type orderStatus = "CHECKOUT" |"PENDING_PAYMENT" | "PAID" | "SHIPPED" |"DELIVERED" | "CANCELLED" 
  

 

export interface orderDrugDto{
    id:number
    drugName:string
    drugImg:string | null
    quantity:number
    priceAtPurchase:number
}


export interface orderDto {
    id:number
    tgUserId:number
    tgChatId:number
    createdAt:string
    totalPrice:number
    orderStatus:orderStatus
    items:orderDrugDto[]

}