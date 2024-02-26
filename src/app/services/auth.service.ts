import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { User } from '../models/user'
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private localStore: LocalService) { }

  login(email:string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then((u)=>{
      console.log(u.user!.uid);
      this.localStore.saveData('uid',u.user!.uid);
      this.localStore.saveData('token','true');
      this.router.navigate(['/main']);
    }, err=>{
      alert('Something went wrong');
      this.router.navigate(['/login']);
    });
  }

  register(email:string, password:string, newUser:User){
    this.fireauth.createUserWithEmailAndPassword(email,password).then((u)=>{
      newUser.userUid =u.user!.uid;
      this.afs.collection('/Users').add(newUser).then(()=>{
        this.router.navigate(['/login']);
        alert('Registration was successfull');
      })
    },err=>{
      alert(err.message);
      this.router.navigate(['/registration']);
    });
  }

  logout(){
    this.fireauth.signOut().then(()=>{
      this.localStore.removeData('token');
      this.localStore.removeData('productsInCart');
      this.localStore.removeData('uid');
      this.router.navigate(['/login']);
    },err=>{
      alert(err.message);
    })
  }
}
