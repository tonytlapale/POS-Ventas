import { Component, Inject, NgIterable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ExistenciaArt } from '../pos-articulos/pos-articulos.component';

@Component({
  selector: 'app-popup-existencias',
  templateUrl: './popup-existencias.component.html',
  styleUrls: ['./popup-existencias.component.css']
})

export class PopupExistenciasComponent implements OnInit {

  existenciaArt: NgIterable<any>;
  displayedColumns: string[] = ['warehouse_ID','description','existencia'];

  constructor(public dialogRef: MatDialogRef<PopupExistenciasComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: NgIterable<any>) {
     }

   

  dataSource!: MatTableDataSource<ExistenciaArt>;
  ngOnInit(): void {
   // alert(" Llegamos a la pantalla del popup " );
    
  }

  cancelar() {
    this.dialogRef.close();
  }

}

