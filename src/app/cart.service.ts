import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from './cart';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  protected cartList: Cart[] = [];

  constructor(private prod: ProductService) { }
  getCartAll() {
    return this.cartList;
  }
  getInStock(id: number) {
    return this.cartList.find((i) => i.Id === id)?.inStock;
  }
  addCart(
    productId: number,
    frmProducts: any,
    selectedSize: string,
    selectedColor: string,
    quantity: number
  ) {
    const existingItem = this.cartList.find(
      (item) =>
        item.Id === productId &&
        item.Size === selectedSize &&
        item.Color === selectedColor
    );
  
    if (!existingItem) {
      const newItem: Cart = {
        Id: productId,
        Name: frmProducts.productName,
        Size: selectedSize,
        Color: selectedColor,
        Code: frmProducts.productCode,
        Des: frmProducts.description,
        Price: frmProducts.price,
        ImageUrl: frmProducts.imageUrl,
        inStock: frmProducts.inStock,
        Quantity:  Number(quantity),
      };
  
      // Make sure Quantity is initialized before using it
      newItem.Quantity = Number(quantity);
      newItem.inStock = newItem.inStock! - Number(quantity);
  
      this.cartList.push(newItem);
      console.log(this.cartList);
    } else {
      // Nếu tìm thấy sản phẩm trong giỏ hàng, tăng số lượng cho mục đó
      existingItem.Quantity = existingItem.Quantity! + Number(quantity);
      existingItem.inStock = existingItem.inStock! - Number(quantity);
    }
  }
  
  
  totalItems() {
    let sum = 0;
    this.cartList.forEach((item) => {
      sum += item.Quantity!;
    });
    return sum;
  }
  Total() {
    let total = 0;
    this.cartList.forEach((item) => {
      total += item?.Price! * item?.Quantity!;
    });
    return total;
  }
  RemoveCart(index: number) {
    
    this.cartList[index].inStock! += 1;
    this.cartList[index].Quantity! -= 1;

    if (this.cartList[index].Quantity == 0) {
      this.cartList.splice(index, 1);
    }
}
DeleteAllCart() {
  for (let i = 0; i < this.cartList.length; i++) {
    this.cartList.splice(i, 1);
  }
  this.cartList = [];
}

}


