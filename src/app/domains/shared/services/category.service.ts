import { Category } from './../models/category.model';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http = inject(HttpClient);

  constructor() { }

  getCategories() {
      return this.http.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
  }
}
