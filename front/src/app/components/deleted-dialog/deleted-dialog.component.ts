import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/Product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deleted-dialog',
  templateUrl: './deleted-dialog.component.html',
  styleUrls: ['./deleted-dialog.component.css']
})
export class DeletedDialogComponent {
  inputValue!: string;

  constructor(
    public dialogRef: MatDialogRef<DeletedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string }
  ) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close('confirm');
  }

}
