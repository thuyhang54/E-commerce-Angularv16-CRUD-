import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-shirt',
  templateUrl: './shirt.component.html',
  styleUrls: ['./shirt.component.css']
})
export class ShirtComponent implements OnInit {
  productsByCategory: Product[] = [];
constructor( private router: ActivatedRoute, private productService: ProductService){}
  ngOnInit(): void {
   let id = Number(this.router.snapshot.params['id']);
  //  this.productsByCategory =this.productService.getProductByIdCategory(id);
  }
}
