import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { DataService } from '../services/data.service';
import { Offer } from '../models/offer';
import { Category } from '../models/category';
import { Product } from '../models/product';
import { LocalService } from '../services/local.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{

  token = false;

  searchText = "";

  offersList: Offer[] = [];

  productsInOfferList: Product[] = [];

  productsList: Product[] = [];

  categoriesList: Category[]=[];

  productsInCartList: Product[] = [];

  searchResultProducts: Product[] = [];

  constructor(private dataService: DataService,private localStore: LocalService,private router: Router) {}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
    this.getAllCategories();
    this.getAllProducts();
    this.getAllProductsInOffer();

  }

  getAllCategories() {

    this.dataService.getAllCategories().subscribe({
      next: (v) => {
        this.categoriesList = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  getAllProducts(){
    this.dataService.getAllProducts().subscribe({
      next: (v) => {
        this.productsList = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  getAllProductsInOffer(){
    this.dataService.getAllProductsInOffer().subscribe({
      next: (v) => {
        this.offersList = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        this.productsInOfferList = this.productsList.filter((p)=> {
          return this.offersList.some((o) => {
            return o.productId === p.id ;
          });
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  addProductInCart(item:Product){
    this.productsInCartList.push(item);
    this.localStore.saveData("productsInCart",JSON.stringify(this.productsInCartList));
  }
  
  search(){
    this.router.navigate(["/searchResults", this.searchText]);
  }
}
