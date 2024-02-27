import { Component, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { SearchService } from '../search.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   
    products: Product[] = [];
constructor(private productService: ProductService,private searchService: SearchService ){
  this.products=productService.getProduct();
  
}

// ngOnInit(): void {
//   this.products =this.productService.getProduct();
//  }



}
