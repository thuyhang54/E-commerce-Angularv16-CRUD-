import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { CategoryService } from '../category.service';
import { Category, Subcategory } from '../category'; 
import { Output, EventEmitter } from '@angular/core';
// import { SearchService } from '../search.service';
import { AuthService } from '../Auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  productDetail: Product | undefined ;
  cartList: Cart[] =[];
  categories: Category[] =[];
 // product
  filteredProductList: Product[] = [];
  products: Product[] =[];
  searching: string = "";
  //  Output để truyền danh sách sản phẩm đã lọc (filteredProductList) về component cha (home)
  @Output() filteredProductEvent = new EventEmitter<Product[]>();

  constructor(private router: ActivatedRoute, public productService: ProductService, private cartService: CartService,private categoryService: CategoryService,private authService: AuthService ) {
    this.cartList = cartService.getCartAll();
    this.products = productService.getProduct();
    this.filteredProductList = this.products;
  }
  ngOnInit(): void {

    this.categories = this.categoryService.getCategories();
  }

  filterResults(){
    if(!this.searching ){
      this.filteredProductList = this.products;
    }else{
      this.filteredProductList =this.products.filter
      (
        list => list?.productName!.toLowerCase().includes(this.searching!.toLowerCase())
        );
    }
    console.log('Filtered Products:', this.filteredProductList);
    
   // Sau khi lọc, emit sự kiện với danh sách sản phẩm đã lọc
      this.filteredProductEvent.emit(this.filteredProductList);
      console.log(this.filteredProductEvent);
      
  }
 
  ItemCount() { 
    return this.cartService.totalItems()
   }
   ItemSum() {
    return this.cartService.Total()
    }
    // Remove(index: number) {
    //   this.cartService.RemoveCart(index) 
    //  }
    //  DeleteAll() {
    //   this.cartService.DeleteAllCart()
    //   }
    // filterResults() {
    //   this.searchService.setKeywords(this.searchService.searchKeywords$)
    // }
    isAuthenticated(){
      return this.authService.isAuthenticated;
    }
    logOut(){
    
      this.authService.LogOut();
    }

    

}
