import { Component } from '@angular/core';
import { Product } from '../product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-pants',
  templateUrl: './pants.component.html',
  styleUrls: ['./pants.component.css']
})
export class PantsComponent {
  productsByCategory: Product[] = [];
constructor( private router: ActivatedRoute, private productService: ProductService){}
  ngOnInit(): void {
   let id = Number(this.router.snapshot.params['id']);
  //  this.productsByCategory =this.productService.getProductByIdCategory(id);
  }
}
