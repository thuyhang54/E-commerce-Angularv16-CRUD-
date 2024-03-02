import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { CategoryService } from '../category.service';
import { Category, Subcategory } from '../category'; 
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @Input() productHome : Product[]=[];
  productDetail: Product | undefined ;
  cartList: Cart[] =[];
  categories: Category[] =[];
  filteredProductList: Product[] = [];
  private searchSubscription: Subscription | undefined; // Thêm một thuộc tính subscription
  constructor(private router: ActivatedRoute, public productService: ProductService, private cartService: CartService,private categoryService: CategoryService,private authService: AuthService, public searchService: SearchService ) {
    this.cartList = cartService.getCartAll();
  }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
   // Đăng ký theo dõi observable filteredProductList$
   this.searchSubscription = this.searchService.filteredProductList$.subscribe(
    (filteredProducts: Product[]) => {
      this.filteredProductList = filteredProducts;
    }
  
    
  );
  }
  ngOnDestroy(): void {
    // Hủy đăng ký để tránh rò rỉ bộ nhớ
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
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
