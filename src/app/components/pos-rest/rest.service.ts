import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Empleado } from '../pos-empleado/empleado';
import { UserDetalle } from "../pos-empleado/UserDetalle";
import { UserRole } from '../pos-empleado/UserRole';

@Injectable({
  providedIn: 'root'
})
export class RestService {

    //Esta URL obtiene el listado de todos los empleados en el backend
   /* private baseURL  = "http://10.1.12.105:8080/api/v1/";  */
    private baseURL  = "http://10.1.12.105:8080/api/v1";
    private ruta = "";

    
    constructor(private httpClient : HttpClient) {}


      //este metodo nos sirve para obtener los empleados
    obtenerListaDeEmpleados():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`);
     }


     //este metodo nos sirve para obtener los proveedores
    obtenerProveedores():Observable<any[]>{
      this.ruta = "/obtenerProveedor";
      return this.httpClient.get<any>(`${this.baseURL+this.ruta}`);
       }
  


  //este metodo sirve para obtener o buscar un empleado
  obtenerEmpleadoPorId(id:string):Observable<Empleado>{
    this.ruta = "/empleados";
    return this.httpClient.get<Empleado>(`${this.baseURL+this.ruta}/${id}`);
  }


  
  //este metodo sirve para obtener o buscar un empleado
  obtenerEmpleadoDetalle(id:string):Observable<UserDetalle>{
    this.ruta = "/empleadoDatos";
    return this.httpClient.get<UserDetalle>(`${this.baseURL+this.ruta}/${id}`);
  }


  //este metodo sirve para obtener o buscar el rol un empleado
  obtenerRolEmpleado(id:string):Observable<UserRole>{
    this.ruta = "/rolEmpleado";
    return this.httpClient.get<UserRole>(`${this.baseURL+this.ruta}/${id}`);
  }

  //este metodo sirve para obtener o buscar las listas de un empleado
  obtenerListaEmpleado(id:string):Observable<any>{
    this.ruta = "/listapreciosEmpleado";
    return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${id}`);
  }


  //este metodo sirve para obtener o buscar detalles de articulos
  obtenerListaArticulos(idProvedor:string, decripcion:string,
                        claveArt:string, listaPre:string, idTienda:string):Observable<any>{
    this.ruta = "/detalleArticulo";
    return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${idProvedor}/${decripcion}/${claveArt}/${listaPre}/${idTienda}`);
   
  }


//este metodo sirve para obtener o buscar existencia de articulo
obtenerExistenciaArticulos(id:string, tienda:string,user:string):Observable<any>{
  this.ruta = "/articuloExisten";
  return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${id}/${tienda}/${user}`);

  }



  //este metodo sirve para obtener o buscar Clientes
  obtenerListaClientes(razonSocial:string, rfc:string, idCliente:string, tienda:string,user:string):Observable<any>{
this.ruta = "/obtenerClientes";
return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${razonSocial}/${rfc}/${idCliente}/${tienda}/${user}`);

}


  //este metodo sirve para obtener o buscar Clientes
  obtenerDirecFactu( idCliente:string, tienda:string,user:string):Observable<any>{
    this.ruta = "/obtenerDirecFactu";
    return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${idCliente}/${tienda}/${user}`);
    }


  //este metodo sirve para obtener o buscar direccion de embarques
  obtenerDirecEmbar( idCliente:string):Observable<any>{
    this.ruta = "/obtenerDirecEmbarques";
    return this.httpClient.get<any>(`${this.baseURL+this.ruta}/${idCliente}`);
    }


}
