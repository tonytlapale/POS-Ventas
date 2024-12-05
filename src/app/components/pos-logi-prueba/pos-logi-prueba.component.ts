import { Component, NgIterable, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PopupExistenciasComponent } from '../popup-existencias/popup-existencias.component';
import { DatosItem, ExistenciaArt } from '../pos-articulos/pos-articulos.component';
import { UserDetalle } from '../pos-empleado/UserDetalle';
import { UserRole } from '../pos-empleado/UserRole';
import { RestService } from '../pos-rest/rest.service';

@Component({
  selector: 'app-pos-logi-prueba',
  templateUrl: './pos-logi-prueba.component.html',
  styleUrls: ['./pos-logi-prueba.component.css']
})
export class PosLogiPruebaComponent implements OnInit {


  id:string;
  empleadoDetalle:UserDetalle;
  userList: NgIterable<any>;
  proveedor: NgIterable<any>;
  cajera:boolean;
  userRol:UserRole;
  existenciaArt:ExistenciaArt;
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
  datosItem:NgIterable<any>;
  displayedColumns: string[] = ['Articulo', 'CAT', 'Descripción', 'UOM',  'Precio Unit.', 'actions'];
  dataSource!: MatTableDataSource<DatosItem>;
  DatosItem2:any;
  public load: boolean;
  Modalswitch: boolean;

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
 


  buscaDetalleArticulos(){



  /* VALIDAR SI TODOS LOS CAMPOS ESTAN VACIOS Y NO SE VALLAN VACIOS LOS DATOS */

  if(this.buscaProveedor == undefined && this.buscaDescripcion == undefined  &&
     this.buscaClaveArt  == undefined ){
      alert("Debe de ingresar almenos un dato de busqueda. ");
      return;
  }
      

  /* VALIDAR AL PROVEEDOR Y NO SE VALLAN VACIOS LOS DATOS */

  if(this.buscaProveedor == undefined || this.buscaProveedor == "0" ){
    /* alert("Si entro entro error   "+this.buscaProveedor); */
    this.buscaProveedorFin = "Sin Proveedor";
  }else{
    let sentencias = this.buscaProveedor.split(/-/,1);
    this.buscaProveedorFin = ""+sentencias;
  }

  /* alert("El proveedor final es "+this.buscaProveedorFin); */
  



  /* VALIDAR LA DESCRIPCIÓN Y NO SE VALLAN VACIOS LOS DATOS */

  if(this.buscaDescripcion == undefined || "" == this.buscaDescripcion){
    this.buscaDescripcionFin = "Sin descripcion"
  }else{
    this.buscaDescripcionFin = this.buscaDescripcion;
  }
  this.cadena = this.buscaDescripcionFin.replace(/%/g, "");
  this.parametro = this.cadena.length;
  if(this.parametro <= 3){
    alert("La descripción debe contener al menos 4 caractéres. ");
    return;
  }
  /* alert("La descripción final es "+this.buscaDescripcionFin); */


  /* VALIDAR LA CLAVE DEL ARTICULO Y NO SE VALLAN VACIOS LOS DATOS */
  if(this.buscaClaveArt == undefined){
     this.buscaClaveArtFin = "Sin Clave";
  }else{
    this.buscaClaveArtFin = this.buscaClaveArt;
  }
  /* alert("La clave final es "+this.buscaClaveArtFin); */



   /* VALIDAR LA CLAVE DEL ARTICULO Y NO SE VALLAN VACIOS LOS DATOS */
   if(this.buscaPriceList == undefined || this.buscaPriceList == "0" ){
    alert("No ha seleccionado la lista de precios.");
    return;
   }else{
     this.buscaPriceListFin = this.buscaPriceList
   }
   /* alert("La Lista final es "+this.buscaPriceListFin); */

   this.tiendaFin = this.empleadoDetalle.name.substring(0,3);
   /* alert("La tienda final es "+this.tiendaFin); */

   
   this.ejecutaBusqueda();
   

  }

  ejecutaBusqueda(){

    this.spinnerService.show();
    this.restService.obtenerListaArticulos(this.buscaProveedorFin,this.buscaDescripcionFin,this.buscaClaveArtFin,this.buscaPriceListFin,this.tiendaFin).subscribe(data => { 
     this.datosItem = data;
     this.DatosItem2 = data;
     this.dataSource = new MatTableDataSource(this.DatosItem2)
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



 openDialog(articulo: string, tienda:string, user:string): void {
  
  tienda   = tienda.substring(0,3);
  articulo = articulo;
  user     = user;

   //alert("Buscando exostencia del articulo " + tienda+articulo+ user);
  this.restService.obtenerExistenciaArticulos(articulo,tienda, user).subscribe(data => { 
  this.existenciaArt = data;
  if("" == data || null == data || undefined == data){
    alert("Sin existencia el articulo seleccionado!!");
  }else{ 
  let dialogRef = this.dialog.open(PopupExistenciasComponent, {
    data: this.existenciaArt
  });
  dialogRef.afterClosed().subscribe(result => {
  });
  }
  
  });

  
}

}







