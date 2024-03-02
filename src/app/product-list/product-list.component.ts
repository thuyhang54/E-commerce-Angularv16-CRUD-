import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() productList: Product[] = [];
  showRating(event: any) {
    alert(`${event}`);
  }
  formProduct = new FormGroup({
    productId: new FormControl<number>(1),
    productName: new FormControl<string>(''),
    productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    imageUrl: new FormControl<string>(''),
  });
  file: string=''
  IsAdd: number = 1
  IsUpdate: number = 0
  constructor(private prod : ProductService ){
    this.productList = prod.getProduct();
    this.filterProductList =this.productList;
  }
  filterProductList:Product[] =[]
searching: string = ""
filterResults(){
    if(!this.searching){
      this.filterProductList =this.productList
    }
    this.filterProductList= this.productList.filter(list => list?.productName.toLowerCase().includes(this.searching.toLowerCase()))
}
  onChange(event : any){
    var str = event.target.files[0].name
    this.file= './assets/images/shop/products'+ str
  }
  Add(){
    this.formProduct.controls.productId.setValue(this.prod.AutoId());

this.prod.AddProduct(this.formProduct.value, this.file)
  }
  id: any
  Edit(index:number){
    this.id = index
    this.formProduct.controls.productName.setValue(this.prod.EditProduct(index).productName)
    this.formProduct.controls.productCode.setValue(this.prod.EditProduct(index).productCode)
    this.formProduct.controls.releaseDate.setValue(this.prod.EditProduct(index).releaseDate)
    this.formProduct.controls.description.setValue(this.prod.EditProduct(index).description)
    this.formProduct.controls.price.setValue(this.prod.EditProduct(index).price)
    this.file = this.prod.EditProduct(index).imageUrl

  }
  Update(){
this.prod.Updateproduct(this.id , this.formProduct.value, this.file)
  }
  Delete(index:number){
if (confirm('You have want delete?'))
this.prod.DeleteProduct(index)
  }
  // pagination
  page:number=1;
  count: number =0;
  tableSize: number= 6;
  // tableSizes: any = [3,6,9,12];
 ngOnInit(): void {
  this.getAllProducts();
  
 }
 getAllProducts(): void{
  this.prod.getProduct()
 }
 onTableDatTaChange(event : any){
  this.page = event;
  this.getAllProducts();
 }
//  onTableSizeChange(event : any): void{
//   this.tableSize = event.target.value;
//   this.page = 1;
//   this.getAllProducts();
//  }
   
  
  
}
