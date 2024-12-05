import { Component, NgIterable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupPedidoDetalleClienteComponent } from '../popup-pedido-detalle-cliente/popup-pedido-detalle-cliente.component';
import { UserDetalle } from '../pos-empleado/UserDetalle';
import { UserRole } from '../pos-empleado/UserRole';
import { RestService } from '../pos-rest/rest.service';


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


@Component({
  selector: 'app-pos-pedido',
  templateUrl: './pos-pedido.component.html',
  styleUrls: ['./pos-pedido.component.css']
})
export class PosPedidoComponent implements OnInit {



  id:string;
  empleadoDetalle:UserDetalle;
  userRol:UserRole;
  respuesta1:string;
  userxID:string;
  cajera:boolean;
  userList: NgIterable<any>;
  modalService: any;
  closeResult: string;
  
  detalleClienteID:DetalleClienteID;

  datosDetalleInicial:DetalleClienteID;


  constructor(private restService:RestService, private router:Router, private route:ActivatedRoute
    , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.cajera = false;
    this.id = this.route.snapshot.params['id'];
    this.empleadoDetalle = new UserDetalle();
    this.restService.obtenerEmpleadoDetalle(this.id).subscribe(data => {
    this.empleadoDetalle = data;
    this.buscarListas(this.id);
    this.userxID = (`${this.empleadoDetalle.user_ID}`);
    this.restService.obtenerRolEmpleado(this.userxID).subscribe(data => {
      this.userRol = data;
      console.log("Rol de usuario "+this.userRol)
      
      if(`${this.userRol}`.includes("999999")){
        this.cajera = true;
        console.log("Es cajera entro?? "+this.cajera)
      } 

      console.log("Es cajera sin entrar "+this.cajera)

      });
     
    });
  }


  regresarHome(idUser:string){
    this.router.navigate(['app-pos-home',idUser]);
   }

   buscarListas(idUser:string){
    // this.userList = new UserList();
     this.restService.obtenerListaEmpleado(idUser).subscribe(data => {
     this.userList = data ;
     console.log("Regreso Listas "+this.userList)
   });
   }



   openDialog( tienda: string, user: string): void {
    tienda    = tienda.substring(0,3);
    user      = user;
    console.log("Regreso POPUP "+tienda)
    
    const dialogRef = this.dialog.open(PopupPedidoDetalleClienteComponent, {
      data : {name: tienda, animal: user}
    });
    
    dialogRef.afterClosed().subscribe((result: string) => {
      tienda = result;
    });

  /*   let  dialogRef = this.dialog.open(PopupPedidoDetalleClienteComponent, {
      data : {name: tienda, animal: user}
    });
 */
  /*   let dialogRef = this.dialog.open(PopupPedidoDetalleClienteComponent, {
      data: ''
    });
    dialogRef.afterClosed().subscribe(() => {
    }); */
   // let dialogRef = this.dialog.open(PopupPedidoDetalleClienteComponent, {
     /*  width: '250px', */
   //   data: {name: tienda, animal: user}
   // });

   /*  dialogRef.afterClosed().subscribe((result: string) => {
      user = result;
    }); */
    }
    
 
    
}
  
  





