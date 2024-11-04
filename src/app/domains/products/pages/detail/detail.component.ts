import { Product } from '@shared/models/product.model';
import { Component, signal, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '@shared/services/product.service';
import { CartService } from '@shared/services/cart.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export default class DetailComponent {
  
  @Input() id?: string;
  product = signal<Product | null>(null);
  cover = signal<string | null>(null);
  private ProductService = inject(ProductService);
  private CartService = inject(CartService);

  constructor() {
  }
  ngOnInit(){
    if(this.id){
      this.ProductService.getProduct(this.id)
      .subscribe({
          next : (product) => {
            this.product.set(product);
            if (product.images.length > 0) {
              this.cover.set(product.images[0]);
            }
        }
      })
    }
  }

  changeCover(image: string) {
    this.cover.set(image);
  }

  addToCard(){
    const product = this.product();
    if(product){
      this.CartService.addToCart(product);
    }
  } 
}
