import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule, RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [    
    RouterOutlet,
    RouterModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  token = false;

  productId:string='';

  searchText:string='';

  product:Product[]=[];

  productsInCartList: Product[] = [];

  constructor(private dataService: DataService, private route:ActivatedRoute,private localStore: LocalService, private router: Router){}

  ngOnInit(): void {
    if(this.localStore.getData('token') === 'true'){
      this.token = true;
    }
    this.route.paramMap.subscribe((params:ParamMap)=>{
      this.productId = params.get('id') || '';
    })
    this.getProduct(this.productId);
  }

  getProduct(id:string){
    this.dataService.getProductById(id).subscribe({
      next: (v) => {
        this.product = v.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    });
  }

  addProductInCart(){
    this.productsInCartList.push(this.product[0]);
    this.localStore.saveData("productsInCart",JSON.stringify(this.productsInCartList));
  }

  search(){
    this.router.navigate(["/searchResults", this.searchText]);
  }
}
