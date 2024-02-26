import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
//import { loadStripe } from '@stripe/stripe-js';

import { Product } from '../models/product';
import { LocalService } from '../services/local.service';
import { DataService } from '../services/data.service';
import { Order } from '../models/order';
import { User } from '../models/user';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{

  token = false;
  
  currentDate = new Date();

  searchText:string='';

  productsInCartList: Product[] = [];

  order:Order={
    orderId: '',
    orderLocation: '',
    orderStatus: '',
    orderSubmitedTime: '',
    productsList: [],
    totalCost: 0,
    userUid: ''
  } 

  user:User[]=[];

  constructor(private localStore: LocalService,private dataService: DataService,private router:Router){}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
    this.getProductsInCart();
    this.getUser();
  }
  
  getProductsInCart(){
    console.log(this.localStore.getData("productsInCart"));
    this.productsInCartList = JSON.parse(this.localStore.getData("productsInCart"));
  }
  
  getUser(){
    if(this.token){
      this.dataService.getUserById(this.localStore.getData("uid")).subscribe({
        next: (v) => {
          this.user = v.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });;
    }
  }

  onOrderSubmit(){
    if(this.token){
      
      this.order.totalCost = this.calculateTotalCost();
      this.order.userUid = this.localStore.getData("uid");
      this.order.productsList = this.productsInCartList;
      this.order.orderStatus = 'PLACED';
      this.order.orderSubmitedTime = this.currentDate.getTime().toString();
      this.order.orderId = this.currentDate.getTime().toString();
      this.order.orderLocation = this.user[0].userLocation 
      this.dataService.saveOrder(this.order).then(()=>{
        this.router.navigate(['/main']);
        alert('Your order was successfull');
      })
    }
  }

  removeFromProductFromCart(item:Product){
    let index = this.productsInCartList.indexOf(item);
    this.productsInCartList.splice(index,1);
  }

  calculateTotalCost():number{
    let total=0;
    if(this.productsInCartList.length>0){
      for(let p of this.productsInCartList){
        total=total+p.price*p.quantity;
      }
    }
    return total;
  }
  
  search(){
    this.router.navigate(["/searchResults", this.searchText]);
  }
}
