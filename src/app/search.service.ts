import { Injectable } from '@angular/core';
import { Product } from './product';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchKeywordsSource = new BehaviorSubject<string>('');
  searchKeywords$ = this.searchKeywordsSource.asObservable();

  private filteredProductListSource = new BehaviorSubject<Product[]>([]);
  filteredProductList$ = this.filteredProductListSource.asObservable();

  setKeywords(keywords: string) {
    this.searchKeywordsSource.next(keywords);
  }

  filterResults(products: Product[]): void {
    const keywords = this.searchKeywordsSource.value;
    if (!keywords) {
      // If no keywords, emit the original product list
      this.filteredProductListSource.next(products);
    } else {
      const filteredResults = products.filter(
        product =>
          product &&
          product.productName &&
          product.productName.toLowerCase().includes(keywords.toLowerCase())
      );
      // Emit the filtered results
      this.filteredProductListSource.next(filteredResults);
    }
  }
}
