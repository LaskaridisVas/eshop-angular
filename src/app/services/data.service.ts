import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Offer } from '../models/offer';
import { Order } from '../models/order';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore, private fireStorage : AngularFireStorage) { }

  // get all products
  getAllProducts() {
    return this.afs.collection('/Products').snapshotChanges();
  }

  //get all categories
  getAllCategories() {
    return this.afs.collection('/Category').snapshotChanges();
  }

  //get all offers
  getAllProductsInOffer() {
    return this.afs.collection('/ProductsInOffer').snapshotChanges();
  }

  //get all orders
  getAllOrders(key:string) {
    return this.afs.collection('/IncompleteOrders',ref=>ref.where('userUid','==',key)).snapshotChanges();
  }

  //save order
  saveOrder(order:Order) {
    return this.afs.collection('/IncompleteOrders').add(order);
  }

  updateUser(user:User, userId:string){
    this.afs.doc(`Users/${userId}`).update({userLocation:user.userLocation,userName:user.userName});
  }

  getProductById(key:string){
    return this.afs.collection('/Products',ref=>ref.where('id','==',key)).snapshotChanges();
  }

  getUserById(key:string){
    return this.afs.collection('/Users',ref=>ref.where('userUid','==',key)).snapshotChanges();
  }
}
