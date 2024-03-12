import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
    this.getProduct().subscribe((res) =>{
      this.products = res;
    })
   
    
   }
  products: Product[] =[
 
  ];
  // Auto increment id
  AutoId() {
    var max = 1;
    this.products.forEach((item) => {
      if (item.id > max) max = item.id;
    });
    return max + 1;
  }
  private baseURL = `http://localhost:3000/products`;
  // Get Product
  getProduct(): Observable<Product[]>{
   return this.http.get<Product[]>(`${this.baseURL}`);
  }
  // Get Product  by Id
  getProductId(id: number) {
    return  this.http.get<Product>(`${this.baseURL}/${id}`)
    }
    searchId(id:number){
      return this.products.find(item=> item.id === id)
    }
    getProductsByCategory(category: string): Observable<any[]> {
      const filteredProducts = this.products.filter(product => product.category === category);
      return of(filteredProducts);
    }
 
  AddProduct(frmProduct: any): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.baseURL}`, frmProduct);
  }
 
  // EditProduct(id: number) {
  //   return this.products[id];
  // }
  Updateproduct(id: number, frmProduct: any): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.baseURL}/${id}`, frmProduct);
  }
  DeleteProduct(id: number): Observable<Product[]>  {
    return this.http.delete<Product[]>(`${this.baseURL}/${id}`);
    
  }
  
}
