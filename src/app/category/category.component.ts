import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  token = false;

  searchText:string='';

  categoryName:string='';

  productsList: Product[] = [];

  categoryProducts: Product[] = [];

  productsInCartList: Product[] = [];

  constructor(private dataService: DataService, private route:ActivatedRoute,private localStore: LocalService,private router: Router){}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.categoryName = params.get('id') || '';
    })
    this.getCategoryProducts(this.categoryName);
  }
  
  getCategoryProducts(categoryName:string){
    this.dataService.getAllProducts().subscribe({
      next: (v) => {
        this.productsList = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        this.categoryProducts = this.productsList.filter((p)=> {
          return p.category == categoryName;
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
    this.router.navigate(["/searchResults", this.searchText]);
  }
}
