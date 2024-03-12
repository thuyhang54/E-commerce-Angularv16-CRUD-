import { Injectable } from '@angular/core';
import { Category} from './category';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject,Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  private baseURL = 'http://localhost:3000';
  // getProductsByCategory(category: string): Observable<any[]> {
  //   const url = `${this.baseURL}/products?category=${category}`;
  //   return this.http.get<any[]>(url);
  // }
  // private categoriesSubject = new BehaviorSubject<string[]>([]);
  // categories$: Observable<string[]> = this.categoriesSubject.asObservable();
  // updateCategories(categories: string[]): void {
  //   this.categoriesSubject.next(categories);
  // }

  // categories: Category[] = [];
  // constructor(private http: HttpClient) { 
  //   this.getCategories().subscribe((data)=>{
  //     this.categories = data;
  //   });
  // }
  
  // private baseURL = `http://localhost:3000/categories`;
  // getCategories(): Observable<Category[]> {
  //   return this.http.get<Category[]>(`${this.baseURL}`);
  // }
}
