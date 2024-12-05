import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetalle } from "../pos-empleado/UserDetalle";
import { UserRole } from '../pos-empleado/UserRole';
import { RestService } from '../pos-rest/rest.service';

@Component({
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.css']
})
export class PosHomeComponent implements OnInit {

  id:string;
  empleadoDetalle:UserDetalle;
  userRol:UserRole;
  respuesta1:string;
  userxID:string;
  cajera:boolean;

  constructor(private restService:RestService, private router:Router, private route:ActivatedRoute,
              ) { }

  ngOnInit(): void {

    
    this.cajera = false;
    this.id = this.route.snapshot.params['id'];
    this.empleadoDetalle = new UserDetalle();
    this.restService.obtenerEmpleadoDetalle(this.id).subscribe(data => {
    this.empleadoDetalle = data;
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
   

  verBuscaArticulos(id:string){
    this.router.navigate(['app-pos-articulos',id]);
  }

  verBuscaClientes(id:string){
    this.router.navigate(['app-pos-clientes',id]);
  }

  verBuscaPedidos(id:string){
    this.router.navigate(['app-pos-pedido',id]);
  }

}


