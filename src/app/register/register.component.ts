import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../models/user'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  signUpObj:any={
    email: '',
    password: '',
    passwordRepeat:''
  }

  userObj:User={
    userImage: '',
    userUid: '',
    userLocation: '',
    userName: ''
  };

  confirmPassword=true;

  contactForm= new FormGroup({
    emailControl:new FormControl('', [Validators.required, Validators.email]),
    passwordControl:new FormControl('', Validators.required),
    passwordRepeatControl:new FormControl('', Validators.required)
  })


  constructor(private router:Router, private auth:AuthService){}

  ngOnInit(): void {
    
  }

  onSignUp(){
    if(this.signUpObj.password === this.signUpObj.passwordRepeat){
      this.auth.register(this.signUpObj.email, this.signUpObj.password,this.userObj)
      this.confirmPassword=true;
    }else{
      this.confirmPassword=false;
    }
  }

}

