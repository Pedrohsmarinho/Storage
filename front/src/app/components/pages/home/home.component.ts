import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';
import { DatePipe } from '@angular/common';
import { ProductDialogComponent } from '../../product-dialog/product-dialog.component';
import { DeletedDialogComponent } from '../../deleted-dialog/deleted-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ProductService, DatePipe] // Add DatePipe to providers array
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  products: Product[] = [];

  displayedColumns: string[] = ['name', 'price', 'expiration_date', 'actions'];
  dataSource!: Product[];

  constructor(
    private location: Location,
    public dialog: MatDialog,
    public productService: ProductService,
    private datePipe: DatePipe // Inject DatePipe
  ) {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.dataSource = data.map((product) => ({
        ...product,
        expirationate: this.datePipe.transform(
          product.expiration_date,
          'dd-MM-yyyy'
        ) 
      }));
    });
  }
  ngOnInit(): void {}

  openDialog(product: Product | null): void {
    const dialogData = product === null
      ? { name: '', price: '', expiration_date: '' }
      : { id: product.id, name: product.name, price: product.price, expiration_date: product.expiration_date };
  
    const dialogRef = this.dialog.open(ProductDialogComponent, { data: dialogData });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const updatedProduct = result;
        console.log(updatedProduct);
  
        const productIndex = this.dataSource.findIndex((p) => p.id === updatedProduct.id);
  
        if (productIndex !== -1) {
          console.log('Updating product...');
          this.productService.updateProduct(updatedProduct).subscribe((updatedData: Product) => {
            this.dataSource[productIndex] = updatedData;
            this.table.renderRows();
            console.log('Product updated:', updatedData);
            window.location.reload();
          });
        }
      }
    });
  }
  
  updateProduct(product: Product): void {
    this.openDialog(product);
    console.log('Product to update:', product);
  }
  

  deleteProduct(id: number | undefined): void {
    if (id === undefined) {
      return;
    }

    const product = this.dataSource.find((p) => p.id === id);
    if (!product) {
      return;
    }

    const dialogRef = this.dialog.open(DeletedDialogComponent, {
      data: { productName: product.name }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
          this.productService.deleteProduct(id).subscribe(() => {
          this.dataSource = this.dataSource.filter((p) => p.id !== id);
        });
      }
    });
  }
}