import { Injectable } from '@angular/core';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  products: Product[] =[
  {
    productId: 1,
    productCategory: 1,
    productName: 'Reef Boardsport',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen', 'Trắng'],
    productCode: 'SH-001',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 200,
    inStock: 20,
    starRating: 3.2,
    imageUrl: 
      'assets/images/shop/products/product-1.jpg', 
     
  
  },
  {
    productId: 2,
    productCategory: 1,
    productName: 'Rainbow Shoes',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'SH-002',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 200,
    inStock: 20,
    starRating: 4.2,
    imageUrl: 
      'assets/images/shop/products/product-2.jpg',
     
  
  },
  {
    productId: 3,
    productCategory: 3,
    productName: 'Strayhorn SP',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'DR-001',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 230,
    inStock: 20,
    starRating: 3.5,
    imageUrl: 
      'assets/images/shop/products/product-3.jpg',
      
  
  },
  {
    productId: 4,
    productCategory: 1,
    productName: 'Bradley Mid',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'SH-003',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 245,
    inStock: 20,
    starRating: 4.0,
    imageUrl: 
      'assets/images/shop/products/product-4.jpg',
  
  },
  {
    productId: 5,
    productCategory: 2,
    productName: 'Rainbow Shoes',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'PT-001',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 370,
    inStock: 20,
    starRating: 5.0,
    imageUrl: 'assets/images/shop/products/product-5.jpg'
  },
  {
    productId: 6,
    productCategory: 1,
    productName: 'Reef Boardsport',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'SH-004',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 600,
    inStock: 20,
    starRating: 3.5,
    imageUrl: 'assets/images/shop/products/product-6.jpg'
  },
  {
    productId: 7,
    productCategory: 3,
    productName: 'Reef Boardsport',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'DR-002',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 400,
    inStock: 20,
    starRating: 3.8,
    imageUrl: './assets/images/shop/products/product-7.jpg'
  },
  {
    productId: 8,
    productCategory: 1,
    productName: 'Reef Boardsport',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen'],
    productCode: 'SH-005',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 500,
    inStock: 20,
    starRating: 4.5,
    imageUrl: 'assets/images/shop/products/product-8.jpg'
  },
  {
    productId: 9,
    productCategory: 3,
    productName: 'Reef Boardsport',
    productSize: ['S' , 'M', 'L', 'XL'],
    productColor: ['Đen', 'Trắng'],
    productCode: 'DR-003',
    releaseDate: 'March 19, 2016',
    description: 'Leaf rake with 48-inch wooden handle.',
    price: 300,
    inStock: 20,
    starRating: 4.3,
    imageUrl:'assets/images/shop/products/product-9.jpg'
  },
  ];
  // Auto increment id
  AutoId(): number {
    var max = 1;
    this.products.forEach(function (item) {
      if (item.productId > max) max = item.productId;
    });
    return max + 1;
  }
  // Get Product
  getProduct(){
    return this.products;
  }
  // Get Product  by Id
  getProductId(id: number): any{
    return this.products.find((product)=> product.productId === id);
  }
  getProductByIdCategory(iddm :number) : any{
    const listProdcuts=this.products.filter((p) => p.productCategory === iddm );
    return listProdcuts ;
  }
 
  AddProduct(frmProduct: any, fileImg: string) {
    let id = this.products.push(frmProduct) - 1;
    this.products[id].imageUrl = fileImg;
    console.log(this.products);
  }
  EditProduct(id: number) {
    return this.products[id];
  }
  Updateproduct(id: number, frmProduct: any , fileImg: string){
 this.products[id].productName = frmProduct.productName
 this.products[id].productCode= frmProduct.productCode
 this.products[id].releaseDate = frmProduct.releaseDate
 this.products[id].description = frmProduct.description
 this.products[id].price = frmProduct.price
 this.products[id].imageUrl = fileImg
  }
  DeleteProduct(id: number) {
    this.products.splice(id, 1);
  }
}
