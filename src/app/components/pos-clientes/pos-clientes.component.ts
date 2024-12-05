import { Component, Inject, NgIterable, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetalle } from '../pos-empleado/UserDetalle';
import { UserRole } from '../pos-empleado/UserRole';
import { RestService } from '../pos-rest/rest.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupExistenciasComponent } from '../popup-existencias/popup-existencias.component';
import { stringify } from 'uuid';
import { PopupDetalleClienteComponent } from '../popup-detalle-cliente/popup-detalle-cliente.component';
import { PopupDetalleEmbarquesComponent } from '../popup-detalle-embarques/popup-detalle-embarques.component';



export interface DatosItem {
  inventory_ITEM_ID: string;
  category_SEGMENT1: string;
  description: string;
  primary_UOM: string;
  existencias: string;
  unit_PRICE: string; 

}

export interface DatosDetalleInicial {
    dato:string;
    datonew:string;
}


export interface DatosCliente {
  rfc: string;
  customer_NAME: string;
  local_CUSTOMER_ID:string;
  venta: string;
  price_LIST_H_ID: string;
  venta_ORIGINAL:string;
}



export interface DetalleClienteID{
  rfc:string;
  customer_NAME:string;
  street:string;
  county:string;
  no_INT:string;
  no_EXT:string;
  state_NAME:string;
  county_DETAIL:string;
  phone:string;
  email:string;
  email1:string;
  email2:string;
  zip_CODE:string;
  venta:string;


}

export interface DetalleEmbarques{
  dato:string;
}

export interface ExistenciaArt {
  warehouse_ID: string;
  description: string;
  existencia: string;

}
@Component({
  selector: 'app-pos-clientes',
  templateUrl: './pos-clientes.component.html',
  styleUrls: ['./pos-clientes.component.css']
})
export class PosClientesComponent implements OnInit {

  id:string;
  dialogConfig = new MatDialogConfig();
  empleadoDetalle:UserDetalle;
  userList: NgIterable<any>;
  proveedor: NgIterable<any>;
  cajera:boolean;
  userRol:UserRole;
  existenciaArt:ExistenciaArt;
  detalleClienteID:DetalleClienteID;
  detalleEmbarques:DetalleEmbarques;
  buscaProveedor:string;
  buscaDescripcion:string;
  buscaClaveArt:string;
  buscaPriceList:string;
  buscaProveedorFin:string;
  buscaDescripcionFin:string;
  buscaClaveArtFin:string;
  buscaPriceListFin:string;
  cadena:string;
  parametro:number;
  tiendaFin:string;
  userIdFin:string;
  datosItem:NgIterable<any>;
  datosCliente:NgIterable<any>;
  displayedColumns: string[] = ['RFC', 'Razón Social', 'Cuenta', 'Tipo Cliente',  'L.P', 'actions', '/', 'actions2'];
  dataSource!: MatTableDataSource<DatosCliente>;
  DatosCliente2:any;
  public load: boolean;
  Modalswitch: boolean;
  
  datosDetalleInicial:DetalleClienteID;
  buscaRazonSocial: string;
  buscaRFC: string;
  buscaNoCliente: string;
  buscaRazonSocialFinal: string;
  buscaRFCFinal: string;
  buscaNoClienteFinal: string;
  datosFinal:string;
 

  constructor(private restService:RestService, private router:Router, private route:ActivatedRoute
            , private spinnerService: NgxSpinnerService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.cajera = false;
    this.id = this.route.snapshot.params['id'];
    this.buscarListas(this.id);
    this.buscarDatosUser(this.id);
    this.buscarProveedor();
    this.buscarRole(this.id);
    this.load = false;
    /* this.spinner();  */
  }

  
  spinner(): void {
    this.spinnerService.show();
    setTimeout(() => {
        this.spinnerService.hide();
    }, 20000);
}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  buscarDatosUser(idUser:string){
    this.empleadoDetalle = new UserDetalle();
    this.restService.obtenerEmpleadoDetalle(idUser).subscribe(data => {
    this.empleadoDetalle = data;
    console.log("Regreso Datos User"+this.empleadoDetalle)
  });

  }

  buscarListas(idUser:string){
    // this.userList = new UserList();
    this.restService.obtenerListaEmpleado(idUser).subscribe(data => {
    this.userList = data ;
    console.log("Regreso Listas "+this.userList)
  });
  }

  buscarProveedor(){
    this.restService.obtenerProveedores().subscribe(data =>{
    this.proveedor = data;
    // console.log("Regreso proveedor "+this.proveedor)
    });
  }

  buscarRole(idUser:string){
    this.restService.obtenerRolEmpleado(idUser).subscribe(data => {
      this.userRol = data;
      console.log("Rol de usuario "+this.userRol)
      
      if(`${this.userRol}`.includes("999999")){
        this.cajera = true;
        console.log("Es cajera entro?? "+this.cajera)
      } 

      console.log("Es cajera sin entrar "+this.cajera)

      });
  }


  regresarHome(idUser:string){
    this.router.navigate(['app-pos-home',idUser]);
    }
    
    verBuscaArticulos(id:string){
    this.router.navigate(['app-pos-articulos',id]);
  }
  verBuscaClientes(id:string){
    this.router.navigate(['app-pos-clientes',id]);
  }

  verBuscaPedidos(id:string){
    this.router.navigate(['app-pos-pedido',id]);
  }
  


  buscaDetalleCliente(){

  /* VALIDAR SI TODOS LOS CAMPOS ESTAN VACIOS Y NO SE VALLAN VACIOS LOS DATOS */

  if(this.buscaRazonSocial == undefined && this.buscaRFC == undefined  &&
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


  /* VALIDAR EL RFC Y NO SE VALLAN VACIOS LOS DATOS */

  if(this.buscaRFC == undefined || "" == this.buscaRFC){
    this.buscaRFCFinal = "Sin rfc"
  }else{
    this.buscaRFCFinal = this.buscaRFC;
    this.cadena = this.buscaRFCFinal.replace(/%/g, "");
    this.parametro = this.cadena.length;
    if(this.parametro <= 4){
      alert("El RFC debe contener al menos 5 caractéres. ");
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




    this.tiendaFin = this.empleadoDetalle.name.substring(0,3);
    this.userIdFin = this.empleadoDetalle.user_ID;
    /* alert("La tienda final es "+this.tiendaFin); */

    
    this.ejecutaBusqueda();
    

  }

  ejecutaBusqueda(){
      

    this.spinnerService.show();
    this.restService.obtenerListaClientes(this.buscaRazonSocialFinal,this.buscaRFCFinal,this.buscaNoClienteFinal,this.tiendaFin,this.userIdFin).subscribe(data => { 
      this.datosCliente = data;
      this.DatosCliente2 = data;
      this.dataSource = new MatTableDataSource(this.DatosCliente2)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinnerService.hide();
      if("" == data || null == data || undefined == data){
      alert("Sin resultado con las opciones seleccionadas!!");
    }
      /* alert("La informacion final es "+this.dataSource.data); */
      
      });

  }


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement ).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  detalleExistencia(articulo:string){

  this.Modalswitch = true; 
  // alert("Buscando exostencia del articulo " + articulo);
  
  }



  openDialog( clienteID: string, tienda: string, user: string): void {
  
  tienda    = tienda.substring(0,3);
  clienteID = clienteID;
  user      = user;

  this.restService.obtenerDirecFactu(clienteID,tienda, user).subscribe(data => {
  this.datosDetalleInicial = data;
  /* alert("Regreso Datos User "+ this.datosDetalleInicial.rfc) */ 
  this.datosFinal = data;


 /*  alert("Buscando detalle direccion final  3 " + this.datosDetalleInicial); */
  
  if("" == data || null == data || undefined == data){
    alert("Sin direccion de faturacion!!");
    return;
  }else{ 
  let dialogRef = this.dialog.open(PopupDetalleClienteComponent, {
    data: this.datosDetalleInicial
  });
  dialogRef.afterClosed().subscribe(result => {
  });
  }
  
  });

  
}



openDialog2( clienteID: string): void {
  
  clienteID = clienteID;

  this.restService.obtenerDirecEmbar(clienteID).subscribe(data => {
  this.detalleEmbarques = data;
  /* alert("Regreso Datos User "+ this.datosDetalleInicial.rfc) */ 
  this.datosFinal = data;


 /*  alert("Buscando detalle direccion final  3 " + this.datosDetalleInicial); */
  
  if("" == data || null == data || undefined == data){
    alert("Sin direccion de entrega!!");
    return;
  }else{ 
  let dialogRef = this.dialog.open(PopupDetalleEmbarquesComponent, {
    data: this.detalleEmbarques
  });
  dialogRef.afterClosed().subscribe(result => {
  });
  }
  
  });

  
}


}







