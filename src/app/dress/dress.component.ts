import { Component } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent {
  productsByCategory: Product[] = [];
  constructor( private router: ActivatedRoute, private productService: ProductService){
    let id = Number(this.router.snapshot.params['id']);
    this.productsByCategory =this.productService.getProductByIdCategory(id);
  }
    ngOnInit(): void {
     let id = Number(this.router.snapshot.params['id']);
     this.productsByCategory =this.productService.getProductByIdCategory(id);

    }
     // (cha)Nhận Output() sau đó thực hiện bước lắng nghe sự kiện từ HeaderComponent 
   //và nhận danh sách sản phẩm đã lọc

  // products : Product[] = [];
    
   receiveFilteredProducts(filteredProducts: Product[]) {
    this.productsByCategory = filteredProducts;
  }
}
