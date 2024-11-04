import { Category } from './../../../shared/models/category.model';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';
import { Component,signal,Input, inject, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@product/components/product/product.component';

import { Product } from '@shared/models/product.model';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CategoryService } from '@shared/services/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  constructor() {
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();

  }
  
  ngOnChanges(changes : SimpleChanges) {
     const category_id = changes['category_id'];
     if (category_id) {
        this.getProducts();
      }
  }

  addToCart( product: Product ) {
    // Extract the necessary data from the event
    this.cartService.addToCart(product);
  }

  getProducts() {
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  
}
