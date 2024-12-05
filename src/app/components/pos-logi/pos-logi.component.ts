import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Empleado } from '../pos-empleado/empleado';
import { RestService } from '../pos-rest/rest.service';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pos-logi',
  templateUrl: './pos-logi.component.html',
  styleUrls: ['./pos-logi.component.css']
})
export class PosLogiComponent implements OnInit {
  empleados:Empleado;
  id:string;
  name:string;


  usuario: string;
  contrasena: String;
  cookieValue: string;




  constructor(private restService:RestService,private router:Router,
              private route:ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit(): void {
   // this.obtenerEmpleados();
  }

  public obtenerEmpleados(){
    this.restService.obtenerListaDeEmpleados().subscribe(dato => {
    // this.empleados  = dato;
    });
  }


  public ObtendetalleID(){

     // this.id = this.route.snapshot.params['contrasena'];
    this.id = this.usuario+this.contrasena;
    this.empleados = new Empleado();
    this.restService.obtenerEmpleadoPorId(this.id).subscribe(dato => {
     this.empleados = dato;
     if(this.empleados == null ){
      this.cookieService.delete('token_access', '/', 'localhost', false, 'Lax');
      console.log('NO HAY ACCESO, ERROR DE USUARIO!!');
      Swal.fire('!Error!', 'Es incorrecto su usuario o contraseña.', 'info');
     }else{
     if(`${this.empleados.user_NAME}`  == this.usuario  && `${this.empleados.password}` == this.contrasena){


     // console.log('Esto es el token' + dato.accessToken);
     this.name = 'Angular ' + VERSION.major;
     this.cookieService.set('token_access', uuidv4(), .01 , '/');
     this.cookieValue = this.cookieService.get('token_access');
     console.log('LOGIN EXITOSO AL USUARIO!!'+this.usuario);
      this.router.navigate(['app-pos-home',`${this.empleados.user_ID}`]);
     }else{
      Swal.fire('!Error!', 'Es incorrecto su usuario o contraseña.', 'info');
      this.cookieService.delete('token_access', '/', 'localhost', false, 'Lax');
      console.log('NO HAY ACCESO, ERROR DE USUARIO!!');
      
    }
    }
       
    });

  }



}




