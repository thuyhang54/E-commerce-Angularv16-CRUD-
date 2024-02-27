import { Component } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-dress',
  templateUrl: './dress.component.html',
  styleUrls: ['./dress.component.css']
})
export class DressComponent {
  productsByCategory: Product[] = [];
  constructor( private router: ActivatedRoute, private productService: ProductService){}
    ngOnInit(): void {
     let id = Number(this.router.snapshot.params['id']);
     this.productsByCategory =this.productService.getProductByIdCategory(id);
    }
}
