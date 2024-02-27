import { Injectable } from '@angular/core';
import { Category, Subcategory } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  
  categories: Category[] = [
    {
      categoryId: 1,
      name: 'Home',
    },
    {
      categoryId: 2,
      name: 'Category',
      subcategories: [
        { subcategoryId: 1, name: 'Shirt' },
        { subcategoryId: 2, name: 'Pants' },
        { subcategoryId: 3, name: 'Dress' },
        // { subcategoryId: 4, name: 'Accessories' },
      ],
    },
    {
      categoryId: 3,
      name: 'Dashboard',
    }
  ];

  getCategories(): Category[] {
    return this.categories;
  }
}
