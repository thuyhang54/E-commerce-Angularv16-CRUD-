import { Component } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';
  show(html:any){
    document.getElementById('prod')!.innerHTML =html;
  }
  filteredProducts: Product[] = [];
  products : Product[] = [];
 

   // (cha)Nhận sự kiện đã lọc từ HeaderComponent và cập nhật danh sách sản phẩm đã lọc
   receiveFilteredProductsFromHeader(filteredProducts: Product[]) {
    this.filteredProducts = filteredProducts;
  }
  constructor(private productService: ProductService) {
    productService.getProduct().subscribe(data => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  

}
