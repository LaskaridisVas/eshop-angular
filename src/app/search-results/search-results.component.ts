import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterModule, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit{

  token = false;

  searchText:string='';

  titleText='';

  productsList: Product[] = [];

  searchResultProducts: Product[] = [];

  productsInCartList: Product[] = [];

  constructor(private dataService: DataService, private route:ActivatedRoute,private localStore: LocalService, private router: Router){}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.searchText = params.get('id') || '';
    })
    this.titleText=this.searchText;
    this.getProducts();
  }
  
  getProducts(){
    this.dataService.getAllProducts().subscribe({
      next: (v) => {
        this.productsList = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
         this.searchResultProducts = this.productsList.filter((p)=> {
          console.log(p.name.includes(this.searchText))
           return p.name.includes(this.searchText);
          });
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
    this.router.navigate(["/searchResults", this.searchText]) .then(() => {
      window.location.reload();
    });
  }
}

