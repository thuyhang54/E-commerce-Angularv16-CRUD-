import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-laptop-list',
  templateUrl: './laptop-list.component.html',
  styleUrls: ['./laptop-list.component.css'],
})
export class LaptopListComponent implements OnInit {
  public pageTitle = 'All Laptops';
  laptops: any[] = [];  // Dữ liệu sản phẩm laptop
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    // Lấy dữ liệu sản phẩm laptop dựa vào category là 'laptops'
   this.productService.getProductsByCategory('laptops').subscribe((data: any[])=>{
    this.laptops = data;
   })
  }
}
