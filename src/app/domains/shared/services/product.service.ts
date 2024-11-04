import { Category } from './../models/category.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(Category_id?: string) {
    const url = new URL('https://api.escuelajs.co/api/v1/products');
    if (Category_id) {
      url.searchParams.set('categoryId', Category_id);
    }  
    return this.http.get<Product[]>(url.toString());
  }

  getProduct(id: string) {
      return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`);
  }
}
