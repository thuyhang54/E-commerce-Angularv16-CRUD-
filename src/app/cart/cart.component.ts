import { Component } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  productDetail: Product | undefined;
  cartList: Cart[] = [];
  InStock: number = 0;
  selectedSize: any | null = null;
  selectedColor: any | null = null;
  quantity: number = 1;
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
  // Add() {
  //   if (this.selectedSize && this.selectedColor && this.quantity) {

  //       this.cartService.addCart(this.productDetail?.productId!, this.productDetail!, this.selectedSize, this.selectedColor, this.quantity);
  //       this.InStock = this.cartService.getInStock(this.productDetail?.productId! )!;
  //   }
  // }
  ItemCount() {
    return this.cartService.totalItems();
  }
  ItemSum() {
    return this.cartService.Total();
  }
  increaseQuantity(index: number) {
    // Tăng giảm giá trị số lượng
    this.cartList[index].Quantity!++;

    // Kiểm tra xem số lượng có vượt quá tồn kho không
    if (this.cartList[index].Quantity! >= this.cartList[index].inStock!) {
      alert(`Only ${this.cartList[index].inStock!} products left`);
      this.cartList[index].Quantity = this.cartList[index].inStock!;
    }
  }

  checkQuantity(index: any) {
    if (this.cartList[index].Quantity! >= this.cartList[index].inStock!) {
      alert(`Only ${this.cartList[index].inStock!} products left`);
      this.cartList[index].Quantity = this.cartList[index].inStock!;
    }
  }

  decreaseQuantity(index: number) {
    // Đảm bảo số lượng không thể âm
    if (this.cartList[index].Quantity! > 1) {
      this.cartList[index].Quantity!--;
    }
  }

  Remove(index: number) {
    this.cartService.RemoveCart(index);
  }
  DeleteAll() {
    this.cartService.DeleteAllCart();
  }
}
