import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocalService } from '../services/local.service';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit{

  token = false;

  searchText:string='';

  constructor(private localStore: LocalService,private router:Router){}// private http:HttpClient){}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
  
  }

  search(){
    this.router.navigate(["/searchResults", this.searchText]);
  }

}
