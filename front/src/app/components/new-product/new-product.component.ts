import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service'
@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent {
  btnText = 'add';
  products: Product[] = [];
  constructor(private productService: ProductService){

  }
  ngOnInit(): void { }

  onProductSubmit(product: Product) {
    this.products.push(product);
  }
}