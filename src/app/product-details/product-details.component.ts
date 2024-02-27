import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productDetail: Product | undefined;
  cartList: Cart[] = [];
  InStock: number = 0;
  selectedSize: any | null = null;
  selectedColor: any | null = null;
  quantity: number = 1;
  // Thêm biến để theo dõi trạng thái của số lượng
isQuantityValid: boolean = true;
  // Trong lớp thành phần của bạn
  selectColor(event: any): void {
    this.selectedColor = event.target.value;
  }

  selectSize(event: any): void {
    this.selectedSize = event.target.value;
  }
  // ... (các phương thức khác của bạn)

  setInitialSize(): void {
    this.selectedSize = this.productDetail?.productSize[0] || null;
  }
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    this.cartList = cartService.getCartAll();
  }
  ngOnInit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.productDetail = this.productService.getProductId(id);
    this.InStock = this.productDetail?.inStock!;
  }
  Add() {
    // Kiểm tra điều kiện ràng buộc số lượng
    if (this.selectedSize && this.selectedColor && this.quantity > 0) {
      this.cartService.addCart(
        this.productDetail?.productId!,
        this.productDetail!,
        this.selectedSize,
        this.selectedColor,
        this.quantity
      );
    
      
      this.InStock = this.cartService.getInStock(
        this.productDetail?.productId!
      )!;
      // Hiển thị toast thông báo thành công
      alert('Add Success');
    
    }  else {
    
      // Hiển thị toast thông báo lỗi
      alert('Choose color and size, please');
    }
  }

// Thêm phương thức kiểm tra hợp lệ của số lượng
checkQuantity() {
  // Kiểm tra điều kiện ràng buộc số lượng
  this.isQuantityValid = this.quantity > 0 && !isNaN(this.quantity);
}
 
  
  // ItemCount() {
  //   return this.cartService.totalItems();
  // }
  // ItemSum() {
  //   return this.cartService.Total();
  // }
  // Remove(index: number) {
  //   this.cartService.RemoveCart(index);
  // }
  // DeleteAll() {
  //   this.cartService.DeleteAllCart();
  // }
}
