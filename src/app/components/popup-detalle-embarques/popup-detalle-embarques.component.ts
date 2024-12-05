import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-detalle-embarques',
  templateUrl: './popup-detalle-embarques.component.html',
  styleUrls: ['./popup-detalle-embarques.component.css']
})
export class PopupDetalleEmbarquesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupDetalleEmbarquesComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: NgIterable<any>) {
     }

  ngOnInit(): void {
  }

  cancelar() {
    this.dialogRef.close();
  }

}
