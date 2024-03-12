import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-smart-phones',
  templateUrl: './smart-phones.component.html',
  styleUrls: ['./smart-phones.component.css']
})
export class SmartPhonesComponent implements OnInit  {
  public pageTitle = 'All SmartPhones';
  smartphones: any[] =[];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    // Lấy dữ liệu sản phẩm laptop dựa vào category là 'laptops'
   this.productService.getProductsByCategory('smartphones').subscribe((data: any[])=>{
    this.smartphones = data;
   })
  }
}
