import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  loginObj:any={
    email: '',
    password: ''
  }

  contactForm= new FormGroup({
    emailControl:new FormControl('', [Validators.required, Validators.email]),
    passwordControl:new FormControl('', Validators.required)
  })

  constructor(private router:Router, private auth:AuthService){}

  ngOnInit(): void {
    
  }

  onLogin(){
    //if(){}
    // if(this.loginObj.userName === "admin" && this.loginObj.userName === "admin"){
    //   this.router.navigateByUrl('/landing')
    // }else{
    //   alert("Wrong credentials");
    // }

    // TODO check if is valid email
    // TODO check if is all input has value
    
    this.auth.login(this.loginObj.email, this.loginObj.password)
    // this.loginObj.email='';
    // this.loginObj.password='';

  }

}
