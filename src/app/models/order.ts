import { Product } from "./product";

export interface Order{
    orderId:string,
    orderLocation:string,
    orderStatus:string,
    orderSubmitedTime:string,
    productsList:Product[],
    totalCost:number,
    userUid:string
}