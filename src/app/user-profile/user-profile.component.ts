import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { User } from '../models/user';
import { DataService } from '../services/data.service';
import { LocalService } from '../services/local.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{

  token = false;

  user:User={
    userImage: '',
    userUid: '',
    userLocation: '',
    userName: ''
  };

  userId='';

  constructor(private localStore: LocalService,private dataService: DataService,private router:Router, private auth:AuthService){}

  ngOnInit(): void {
    if(this.localStore.getData('token') == 'true'){
      this.token = true;
    }
    this.getUser();
  }
  
  logout(){
    this.auth.logout();
  }
  
  onClick(){
    this.dataService.updateUser(this.user, this.userId);
  }

  getUser(){
    if(this.token){
      this.dataService.getUserById(this.localStore.getData("uid")).subscribe({
        next: (v) => {
          let u = v.map((e: any) => {
            const data = e.payload.doc.data();
            data.id = e.payload.doc.id;
            return data;
          })
          this.user.userImage=u[0].userImage;
          this.user.userUid=u[0].userUid;
          this.user.userLocation=u[0].userLocation;
          this.user.userName=u[0].userName;
          this.userId=u[0].id;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      });;
    }
  }


}

