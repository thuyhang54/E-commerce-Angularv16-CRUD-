import { Component, Input } from '@angular/core';
import { Product } from '../product';
import { SearchService } from '../search.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  @Input() productHome : Product[]=[];

}
