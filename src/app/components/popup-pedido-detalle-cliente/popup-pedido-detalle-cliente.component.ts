import { Component, Inject, NgIterable, OnInit, ViewChild } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserDetalle } from '../pos-empleado/UserDetalle';
import { RestService } from '../pos-rest/rest.service';


export interface DialogData {
  animal: string;
  name: string;
}

export interface DatosCliente {
  rfc: string;
  customer_NAME: string;
  local_CUSTOMER_ID:string;
  venta: string;
  price_LIST_H_ID: string;
  venta_ORIGINAL:string;
}


@Component({
  selector: 'app-popup-pedido-detalle-cliente',
  templateUrl: './popup-pedido-detalle-cliente.component.html',
  styleUrls: ['./popup-pedido-detalle-cliente.component.css']
})
export class PopupPedidoDetalleClienteComponent implements OnInit {

  //  datosDetalleInicial:DetalleClienteID;
  buscaRazonSocial: string;
  buscaRFC: string;
  buscaNoCliente: string;
  buscaRazonSocialFinal: string;
  buscaRFCFinal: string;
  buscaNoClienteFinal: string;
  datosFinal:string;
  public load: boolean;
  cadena:string;
  parametro:number;
  tiendaFin:string;
  userIdFin:string;
  empleadoDetalle:UserDetalle;
  datosCliente:NgIterable<any>;
  DatosCliente2:any;
  dataSource!: MatTableDataSource<DatosCliente>;
  displayedColumns: string[] = ['Razón Social', 'Cuenta', 'Tipo Cliente',  'L.P', 'actions2'];

 

  constructor(
     private spinnerService: NgxSpinnerService, private restService:RestService,
     public dialogRef: MatDialogRef<PopupPedidoDetalleClienteComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: DialogData
    ) { }

  ngOnInit(): void {
    this.load = false;

  }

  onNoClick() {
    this.dialogRef.close();
  }

   spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
        this.spinnerService.hide();
    }, 20000);
} 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  



  buscaDetalleCliente(){

    /* VALIDAR SI TODOS LOS CAMPOS ESTAN VACIOS Y NO SE VALLAN VACIOS LOS DATOS */
  
    if(this.buscaRazonSocial == undefined  &&
        this.buscaNoCliente  == undefined ){
        alert("Debe de ingresar almenos un dato de busqueda. ");
        return;
    }
        
  
    /* VALIDAR LA RAZON Y NO SE VALLAN VACIOS LOS DATOS */
  
    if(this.buscaRazonSocial == undefined || this.buscaRazonSocial == "" ){
      /* alert("Si entro entro error   "+this.buscaProveedor); */
      this.buscaRazonSocialFinal = "Sin Razon";
    }else{
      this.buscaRazonSocialFinal = this.buscaRazonSocial;
      this.cadena = this.buscaRazonSocialFinal.replace(/%/g, "");
      this.parametro = this.cadena.length;
      if(this.parametro <= 4){
        alert("La razon social debe contener al menos 5 caractéres. ");
        return;
      }
    }
  
  
  
  
    /* VALIDAR EL NUM CLIENTE Y NO SE VALLAN VACIOS LOS DATOS */
  
    if(this.buscaNoCliente == undefined || "" == this.buscaNoCliente){
      this.buscaNoClienteFinal = "Sin no cliente"
    }else{
      this.buscaNoClienteFinal = this.buscaNoCliente;
      this.cadena = this.buscaNoClienteFinal.replace(/%/g, "");
      this.parametro = this.cadena.length;
      if(this.parametro <= 2){
        alert("El numero de cliente debe contener al menos 3 digitos. ");
        return;
      }
    }
  
  
  
  
      this.tiendaFin = this.data.name;
      this.userIdFin = this.data.animal;
      /* alert("La tienda final es "+this.tiendaFin); */
  
      
      this.ejecutaBusqueda();
      
  
    }
  
    ejecutaBusqueda(){
        
      this.buscaRFCFinal = "Sin rfc"
     // this.spinnerService.show();
      this.restService.obtenerListaClientes(this.buscaRazonSocialFinal,this.buscaRFCFinal,this.buscaNoClienteFinal,this.tiendaFin,this.userIdFin).subscribe(data => { 
        this.datosCliente = data;
        this.DatosCliente2 = data;
        this.dataSource = new MatTableDataSource(this.DatosCliente2)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
     //   this.spinnerService.hide();
        if("" == data || null == data || undefined == data){
        alert("Sin resultado con las opciones seleccionadas!!");
      }
     //    alert("La informacion final es "+this.dataSource.data); 
        
        }); 
  
    }


    applyFilter(event: Event){
      const filterValue = (event.target as HTMLInputElement ).value;
      this.dataSource.filter = filterValue.trim().toLowerCase()
  
      if(this.dataSource.paginator){
        this.dataSource.paginator.firstPage()
      }
    }


}
