import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
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
    thumbnailFile: new FormControl<File | null>(null), // Thêm trường này để giữ trạng thái của input file
  });
  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  isEditing = false;

  constructor(private prod: ProductService) {
    this.prod.getProduct().subscribe((data) => (this.productList = data));
  }

  ngOnInit(): void {
    this.formProduct.controls['thumbnail'].setValue('./assets/images');
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
      this.filterProductList = this.productList; // Gán giá trị của filterProductList
      
    });
  }
  searching: string = '';
  filterProductList: Product[] = [];
  filterResults() {
    if (this.searching.trim() === '') {
      this.ngOnInit();
    } else  {
      this.filterProductList = this.productList.filter((product) =>
        product?.title.toLowerCase().includes(this.searching.toLowerCase())
      );
      
    }
    
  
  }
 

  onChange(event: any) {
    var file = event.target.files[0];
    this.file = './assets/images/' + file.name;

    // Đặt giá trị của thumbnailFile
  this.formProduct.controls['thumbnailFile'].setValue(file);
  }
  Add() {
    this.formProduct.controls['thumbnail'].setValue(this.file);
    this.prod.AddProduct(this.formProduct.value).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      alert("Add success!");
  
    // Reset giá trị trong form
    this.formProduct.reset();
    this.formProduct.controls['thumbnail'].setValue('');
    this.formProduct.controls['thumbnailFile'].setValue(null);
    this.file= '';

    // Close modal after add success
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
      closeButton.click();
    }
    });
  }

  id: any;
  editingIndex: number = -1; // Khởi tạo là -1 khi không ở chế độ chỉnh sửa
  Edit(index: number) {
    this.editingIndex = index;

    this.id = this.productList[index].id;
    this.formProduct.controls['title'].setValue(this.productList[index].title);
    this.formProduct.controls['discountPercentage'].setValue(this.productList[index].discountPercentage);
    this.formProduct.controls['stock'].setValue(this.productList[index].stock);
    // this.formProduct.controls['productCode'].setValue(this.productList[index].productCode)
    //  this.formProduct.controls['releaseDate'].setValue(this.productList[index].releaseDate)
    this.formProduct.controls['price'].setValue(this.productList[index].price);
    this.formProduct.controls['description'].setValue(this.productList[index].description );
    this.formProduct.controls['thumbnail'].setValue( this.productList[index].thumbnail);
    this.file = this.productList[index].thumbnail;
  
    
  }

  Update() {
    this.editingIndex = -1;
    this.formProduct.controls['thumbnail'].setValue(this.file);
    this.prod
      .Updateproduct(this.id, this.formProduct.value)
      .subscribe((result) => {
        console.log(result);
        this.ngOnInit();
       
      });
         // Close modal after add success
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
      closeButton.click();
    }
    
  }
  Delete(index: number) {
    if(confirm("Are you sure you want to delete?")) {
      this.id = this.productList[index].id;
      this.prod.DeleteProduct(this.id).subscribe((result) => {
        console.log(result);
        this.ngOnInit();
      });
    }
  
  }
  // pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 6;
  // tableSizes: any = [3,6,9,12];
  // end paginationn

 
  onTableDatTaChange(event: any) {
    this.page = event;
   this.ngOnInit();
  }
  //  onTableSizeChange(event : any): void{
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getAllProducts();
  //  }
  selectedSortOption: any;
  onChangeSort(){
    // Chuyển đổi giá trị lựa chọn sang kiểu số để sử dụng trong sắp xếp
    const sortValue : number = +this.selectedSortOption;
     // Thực hiện logic sắp xếp dựa trên giá trị đã chọn
    if(sortValue === 1){
      this.productList.sort((a,b)=> a.price - b.price);
    }else if(sortValue === -1){
      this.productList.sort((a,b)=> b.price - a.price);
    }
  }
}
