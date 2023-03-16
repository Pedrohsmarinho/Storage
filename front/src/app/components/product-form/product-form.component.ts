import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/Product';
import { lastValueFrom } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Product>();
  @Input() btnText!: string;
  product: Product[] = [];
  productForm!: FormGroup;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      expiration_date: ['', Validators.required],
    });
  }

  get name() {
    return this.productForm.get('name')!;
  }

  get price() {
    return this.productForm.get('price')!;
  }

  get expiration_date() {
    return this.productForm.get('expiration_date')!;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '400px',
      data: this.product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  submit() {
    if (this.productForm.invalid) {
      return;
    }
    const productData: Product = {
      name: this.productForm.value.name,
      price: this.productForm.value.price,
      expiration_date: this.productForm.value.expiration_date
    };
    this.productService.createProduct(productData).subscribe({
      next: (createdProduct: Product) => {
        this.onSubmit.emit(createdProduct);
        console.log('Product created successfully');
        window.location.reload(); // Reload the component
      },
      error: (error) => {
        console.error('Error creating product', error);
      }
    });
  }
}