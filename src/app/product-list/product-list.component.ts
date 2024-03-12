import { Component } from '@angular/core';
import { Product } from '../product';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    title: new FormControl<string>('', [Validators.required]),
    // productCode: new FormControl<string>(''),
    releaseDate: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    discountPercentage: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
    ]),
    stock: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.min(0),
    ]),
    starRating: new FormControl<number>(5),
    thumbnail: new FormControl<string>(''),
    thumbnailFile: new FormControl<File | null>(null), // Thêm trường này để giữ trạng thái của input file
  });

  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  isEditing = false;

  constructor(private route: ActivatedRoute, private prod: ProductService) {
    this.prod.getProduct().subscribe((data) => (this.productList = data));
  }
  category: string = '';
  products: any[] = [];

  ngOnInit(): void {
    this.formProduct.controls['thumbnail'].setValue('./assets/images');
    this.loadDataPage();
  }
  // pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  // end paginationn

  loadDataPage() {
    this.prod.getProduct().subscribe((data) => {
      this.productList = data;
      this.filterProductList = this.productList;
      this.count = this.filterProductList.length; // Cập nhật count cho phân trang
    });
  }
  searching: string = '';
  filterProductList: Product[] = [];
  filterResults() {
    if (this.searching.trim() === '') {
      this.filterProductList = this.productList;
    } else {
      this.filterProductList = this.productList.filter(
        (product) =>
          product?.title &&
          this.searching &&
          product.title.toLowerCase().includes(this.searching.toLowerCase())
      );
      this.page = 1; // Reset về trang đầu tiên sau khi thay đổi kết quả tìm kiếm
      // console.log(this.filterProductList);
    }

    this.count = this.filterProductList.length; // Cập nhật count cho phân trang
  }
  // priceFrom: number =0;
  // priceTo: number =0;
  formGroup = new FormGroup({
    priceFrom: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
    ]),
    priceTo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.min(0),
    ]),
  });
  // filterPrice() {
  //   const priceFromValue = this.formGroup.get('priceFrom')?.value;
  //   const priceToValue = this.formGroup.get('priceTo')?.value;

  //   if (!priceFromValue && !priceToValue) {
  //     // Nếu cả hai ô input đều trống, hiển thị toàn bộ danh sách sản phẩm
  //     this.filterProductList = this.productList;
  //   } else {
  //     // Nếu ít nhất một ô input có giá trị, thực hiện lọc theo điều kiện giá
  //     this.filterProductList = this.productList.filter((product) => {
  //       const productPrice = product.price;

  //       // Kiểm tra kiểu trước khi so sánh
  //       const isPriceFromValid = typeof priceFromValue === 'number';
  //       const isPriceToValid = typeof priceToValue === 'number';

  //       // So sánh nếu kiểu là number
  //       return (!isPriceFromValid || productPrice >= priceFromValue) &&
  //              (!isPriceToValid || productPrice <= priceToValue);
  //     });

  //     this.page = 1; // Reset về trang đầu tiên sau khi thay đổi kết quả tìm kiếm
  //   }

  //   this.count = this.filterProductList.length; // Cập nhật count cho phân trang
  // }

  // filterPrice(){
  //   if(!this.priceFrom && !this.priceTo){
  //     // Nếu cả hai ô input đều trống, hiển thị toàn bộ danh sách sản phẩm
  //     this.filterProductList = this.productList;
  //   }else{
  //     // Nếu ít nhất một ô input có giá trị, thực hiện lọc theo điều kiện giá
  //     this.filterProductList = this.productList.filter((product) =>
  //        {
  //           // Lọc sản phẩm theo điều kiện giá
  //         const productPrice = product.price;
  //         return (!this.priceFrom || productPrice >= this.priceFrom) &&
  //         (!this.priceTo || productPrice <= this.priceTo);

  //       });
  //       this.page = 1; // Reset về trang đầu tiên sau khi thay đổi kết quả tìm kiếm

  //   }
  //   this.count =this.filterProductList.length;// Cập nhật count cho phân trang
  // }

  onChange(event: any) {
    var file = event.target.files[0];
    this.file = './assets/images/' + file.name;

    // Đặt giá trị của thumbnailFile
    this.formProduct.controls['thumbnailFile'].setValue(file);
  }
  Add() {
    this.formProduct.controls['thumbnail'].setValue(this.file);

    this.prod.AddProduct(this.formProduct.value).subscribe((result: any) => {
      // console.log(result);

      const newProductId = result.id;
      // Kiểm tra xem sản phẩm với ID mới đã tồn tại trong productList chưa
      const existingProduct = this.productList.find(
        (product) => product.id === newProductId
      );

      if (!existingProduct) {
        // Chắc chắn rằng result là một đối tượng hợp lệ và có thuộc tính showBackground
        result.showBackground = true;

        // Thêm sản phẩm mới vào đầu của productList
        this.productList.unshift(result);
      }

      this.ngOnInit();
      alert('Thêm thành công!');

      // Đặt lại giá trị trong biểu mẫu
      this.formProduct.reset();
      this.formProduct.controls['thumbnail'].setValue('');
      this.formProduct.controls['thumbnailFile'].setValue(null);
      this.file = '';

      // Đóng modal sau khi thêm mới thành công
      const closeButton = document.getElementById('closeButton');
      if (closeButton) {
        closeButton.click();
      }
    });
  }
  id: any;
  editingIndex: number = -1; // Khởi tạo là -1 khi không ở chế độ chỉnh sửa
  Edit(id: any, index: number) {
    this.editingIndex = index;
    this.id = id; // Lưu giữ giá trị id
    // console.log(id);

    this.formProduct.controls['title'].setValue(this.productList[index].title);
    this.formProduct.controls['discountPercentage'].setValue(
      this.productList[index].discountPercentage
    );
    this.formProduct.controls['stock'].setValue(this.productList[index].stock);
    this.formProduct.controls['releaseDate'].setValue(
      this.productList[index].releaseDate
    );
    this.formProduct.controls['price'].setValue(this.productList[index].price);
    this.formProduct.controls['description'].setValue(
      this.productList[index].description
    );
    this.formProduct.controls['thumbnail'].setValue(
      this.productList[index].thumbnail
    );
    this.file = this.productList[index].thumbnail;
  }

  Update() {
    this.editingIndex = -1;
    this.formProduct.controls['thumbnail'].setValue(this.file);
    this.prod
      .Updateproduct(this.id, this.formProduct.value)
      .subscribe((result) => {
        // console.log(result);
        this.ngOnInit();
      });
    // Close modal after add success
    const closeButton = document.getElementById('closeButton');
    if (closeButton) {
      closeButton.click();
    }
  }

  Delete(id: any) {
    // console.log(id);
    if (confirm(`Are you sure you want to delete this product?`)) {
      this.prod.DeleteProduct(id).subscribe((result) => {
        // console.log(result);
        this.ngOnInit();
      });
    }
  }

  // sort productlist
  selectedSortOption: any;
  onChangeSort() {
    // Chuyển đổi giá trị lựa chọn sang kiểu số để sử dụng trong sắp xếp
    const sortValue: number = +this.selectedSortOption;
    // Thực hiện logic sắp xếp dựa trên giá trị đã chọn
    if (sortValue === 1) {
      this.productList.sort((a, b) => a.price - b.price);
    } else if (sortValue === -1) {
      this.productList.sort((a, b) => b.price - a.price);
    }
    // this.filterPrice()
  }
  //
  // onDataChange(){
  //   this.filterResults();
  //   // this.filterPrice();
  //   this.onChangeSort();
  // }
  //
  // onTableDaTaChange(event: any) {
  //   this.page = event;
  //   this.onDataChange(); // Áp dụng tất cả các thay đổi khi chuyển trang
  //   // this.filterResults(); // Áp dụng tìm kiếm sau khi chuyển trang
  // }
  //  onTableSizeChange(event : any): void{
  //   this.tableSize = event.target.value;
  //   this.onDataChange();
  //  }
}
