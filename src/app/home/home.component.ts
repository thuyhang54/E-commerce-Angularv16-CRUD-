import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
   // (cha)Nhận Output() sau đó thực hiện bước lắng nghe sự kiện từ HeaderComponent 
   //và nhận danh sách sản phẩm đã lọc
  filteredProducts: Product[] = [];
  products : Product[] = [];
    
   receiveFilteredProducts(filteredProducts: Product[]) {
    this.filteredProducts = filteredProducts;
  }
constructor(private productService: ProductService ){
  productService.getProduct().subscribe(data=>
    { this.products= data
     this.filteredProducts =this.products
    });
}




}
