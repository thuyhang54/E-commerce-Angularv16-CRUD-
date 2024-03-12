import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Cart } from './cart';
import { Product } from './product';
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
  addCart(index: number, frmProducts: any, quantity: number) {

     // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
    let itemInCart = this.cartList.filter((i) => i.Id == index );
    let isItemInCart = itemInCart.length > 0;

    if (!isItemInCart) {
      let id = this.cartList.push({
          "Id": frmProducts.id,
          "Name": frmProducts.title,
          "Code": frmProducts.productCode,
          "Des": frmProducts.description,
          "Price": frmProducts.price,
          "ImageUrl": frmProducts.thumbnail,
          "inStock": frmProducts.stock ,
          "Quantity": 0,
        }) - 1;
      
      this.cartList[id].Quantity = this.cartList[id].Quantity! + Number(quantity);
      this.cartList[id].inStock = this.cartList[id].inStock! -  Number(quantity);
      console.log(this.cartList);
    } else {
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].Id == index) {
          this.cartList[i].Quantity = this.cartList[i].Quantity! + Number(quantity);
          this.cartList[i].inStock = this.cartList[i].inStock! - Number(quantity);
        }
      }
    }
  }
  
  updateCartQuantities(cartList: Cart[], productDetail: Product[]): void {
    cartList.forEach(cartItem => {
      const product = productDetail.find((p : any) => p.id === cartItem.Id);
      if (product) {
        if (cartItem.Quantity! > product.stock) {
          cartItem.Quantity = product.stock;
        }
      }
    });
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
    if (this.cartList[index].Quantity === 1) {
      const productName =this.cartList[index].Name;
      const confirmation = confirm(`Bạn có chắc muốn xóa ${productName} khỏi giỏ hàng?`);

      if(!confirmation){
        return ; // Người dùng không xác nhận, không thực hiện xóa
    }else{
      this.cartList.splice(index, 1);
    }
  } 
  // if (this.cartList[index].Quantity === 0) {
  //   this.cartList.splice(index, 1);
  // }
  
    this.cartList[index].inStock! += 1;
    this.cartList[index].Quantity! -= 1;

   
}
DeleteAllCart() {
  for (let i = 0; i < this.cartList.length; i++) {
    this.cartList.splice(i, 1);
    i--;
  }
  
}

}


