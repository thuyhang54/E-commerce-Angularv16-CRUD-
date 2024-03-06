import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   productList: Product[] = [];
  showRating(event: any) {
    alert(`${event}`);
  }
  
  formProduct = new FormGroup({
   
    title: new FormControl<string>(''),
    // productCode: new FormControl<string>(''),
    // releaseDate: new FormControl<string>(''),
    price: new FormControl<number>(0),
    discountPercentage: new FormControl<number>(0),
    stock: new FormControl<number>(0),
    description: new FormControl<string>(''),
    starRating: new FormControl<number>(5),
    thumbnail: new FormControl<string>(''),
  });
  file: string=''
  IsAdd: number = 1
  IsUpdate: number = 0
  constructor(private prod : ProductService ){
     this.prod.getProduct().subscribe(data=> this.productList = data)
  }

  ngOnInit() : void {
    this.formProduct.controls['thumbnail'].setValue('./assets/images')
   this.prod.getProduct().subscribe((data) => { this.productList = data })
 }

  searching: string = "";
  filterProductList:Product[] =[]
  filterResults(){
    if (this.searching.trim() == '') {
      this.filterProductList = this.productList;
    } else {
      this.filterProductList = this.productList.filter(
        list => list?.title.toLowerCase().includes(this.searching.toLowerCase())
      );
    }

// Cập nhật trang hiện tại để hiển thị kết quả lọc
  this.page = 1;
  this.getAllProducts();
  }

  onChange(event : any){
    var str = event.target.files[0].name
    this.file= './assets/images/'+ str
  }
  Add() {
    this.formProduct.controls['thumbnail'].setValue(this.file)
    this.prod.AddProduct(this.formProduct.value).subscribe((result) => {
      console.log(result)
      this.ngOnInit()
    })
  }
  
  id: any
  Edit(index: number) {
    this.id = this.productList[index].id 
   this.formProduct.controls['title'].setValue(this.productList[index].title)
    // this.formProduct.controls['productCode'].setValue(this.productList[index].productCode)
    //  this.formProduct.controls['releaseDate'].setValue(this.productList[index].releaseDate) 
     this.formProduct.controls['price'].setValue(this.productList[index].price)
      this.formProduct.controls['description'].setValue(this.productList[index].description)
       this.formProduct.controls['thumbnail'].setValue(this.productList[index].thumbnail)
        this.file = this.productList[index].thumbnail 
      }
      
      Update() {
        this.formProduct.controls['thumbnail'].setValue(this.file)
        this.prod.Updateproduct(this.id, this.formProduct.value).subscribe((result) =>{
          console.log(result)
          this.ngOnInit()
        });
        }
        Delete(index: number) {
          this.id=this.productList[index].id
          this.prod.DeleteProduct(this.id).subscribe((result) =>{
            console.log(result)
            this.ngOnInit()
          })
        }
  // pagination
  page:number=1;
  count: number =0;
  tableSize: number= 6;
  // tableSizes: any = [3,6,9,12];
   // end paginationn



 
 getAllProducts(): void{
  // Nếu có tìm kiếm, sử dụng danh sách đã lọc
  const productsToShow = this.searching ? this.filterProductList : this.productList;
  // Tính toán số lượng trang 
  this.count = productsToShow.length;
  // Lấy chỉ mục bắt đầu và kích thước trang
  const startIndex = (this.page - 1) * this.tableSize;
  const endIndex = startIndex + this.tableSize;
  // Cập nhật danh sách sản phẩm để hiển thị trên trang hiện tại
  this.productList =productsToShow.slice(startIndex,endIndex);

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
