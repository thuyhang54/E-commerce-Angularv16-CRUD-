import { Component, Input ,OnInit} from '@angular/core';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  public pageTitle = 'Trendy Products';
  @Input() productHome : Product[]=[];
 
}
