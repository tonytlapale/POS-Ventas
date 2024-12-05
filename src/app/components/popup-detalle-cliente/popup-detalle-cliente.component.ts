import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faSquarePhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popup-detalle-cliente',
  templateUrl: './popup-detalle-cliente.component.html',
  styleUrls: ['./popup-detalle-cliente.component.css']
})
export class PopupDetalleClienteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupDetalleClienteComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: NgIterable<any>) {
     }
  ngOnInit(): void {
  }

  faSquarePhone = faSquarePhone;
  
  cancelar() {
    this.dialogRef.close();
  }



}
