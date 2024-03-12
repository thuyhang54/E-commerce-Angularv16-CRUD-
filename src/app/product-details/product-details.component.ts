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
  showRating(event: any) {
    alert(`${event}`);
  }
  productDetail: Product | undefined;
  cartList: Cart[] = [];
  InStock: number = 0;
  selectedSize: any | null = null;
  selectedColor: any | null = null;
  quantity: number = 1;
  // Thêm biến để theo dõi trạng thái của số lượng
  isQuantityValid: boolean = true;
  // Trong lớp thành phần của bạn
  // selectColor(event: any): void {
  //   this.selectedColor = event.target.value;
  // }

  // selectSize(event: any): void {
  //   this.selectedSize = event.target.value;
  // }
  // ... (các phương thức khác của bạn)

  // setInitialSize(): void {
  //   this.selectedSize = this.productDetail?.productSize[0] || null;
  // }

  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {
    this.cartList = cartService.getCartAll();
  }
  originalInStock: number = 0;
  ngOnInit(): void {
    let id = Number(this.router.snapshot.params['id']);
    this.productService.getProductId(id).subscribe((data) => {
      this.productDetail = data;
      this.InStock = this.productDetail?.stock!;
      // Lưu trạng thái ban đầu của InStock
      this.originalInStock = this.InStock;
      this.returnToProductDetail();
    });
  }
  Add() {
    // Kiểm tra điều kiện ràng buộc số lượng
    this.checkQuantity();
    // Kiểm tra điều kiện ràng buộc số lượng
    if (this.quantity > 0) {
      // Kiểm tra số lượng có lớn hơn tồn hàng không
      if (this.quantity > this.InStock) {
        alert('Quantity cannot be greater than the quantity in stock');
        return;
      }

      // Thêm vào giỏ hàng
      this.cartService.addCart(
        this.productDetail!.id!,
        this.productDetail!,
        this.quantity
      );
      // Giảm số lượng tồn hàng
      this.InStock -= this.quantity;
      // Cập nhật giá trị originalInStock
      this.originalInStock = this.InStock;

      alert('Successfully added to cart');
    } else {
      alert('Please select a valid quantity.');
    }
  }

  // Thêm phương thức kiểm tra hợp lệ của số lượng
  checkQuantity() {
    // Kiểm tra điều kiện ràng buộc số lượng
    this.isQuantityValid = this.quantity > 0 && !isNaN(this.quantity);
  }
  returnToProductDetail() {
    // Kiểm tra xem có sự thay đổi trong giỏ hàng không
    const itemsInCart = this.cartService.getCartAll();
    if (itemsInCart.length > 0) {
      // Tính toán sự thay đổi trong số lượng tồn kho
      let quantityChange = 0;

      // Lặp qua từng sản phẩm trong giỏ hàng để tính tổng sự thay đổi
      itemsInCart.forEach((item) => {
        quantityChange += item.Quantity!;
      });

      // Nếu có sự thay đổi, giảm InStock tương ứng
      if (quantityChange > 0) {
        this.InStock -= quantityChange;
        // Cập nhật giá trị originalInStock
        this.originalInStock = this.InStock;
      }
    }
  }
}
