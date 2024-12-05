import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { PosHomeComponent } from './components/pos-home/pos-home.component';
import { PosLogiComponent } from './components/pos-logi/pos-logi.component';
import { VigilanteGuard } from './pos-vigilante/vigilante.guard';
import { PosLogiPruebaComponent} from './components/pos-logi-prueba/pos-logi-prueba.component';
import { PosArticulosComponent } from './components/pos-articulos/pos-articulos.component';
import { PopupExistenciasComponent } from './components/popup-existencias/popup-existencias.component';
import { PosClientesComponent } from './components/pos-clientes/pos-clientes.component';
import { PosPedidoComponent } from './components/pos-pedido/pos-pedido.component';


const routes: Routes = [
      {path: 'app-pos-logi-prueba',component:PosLogiPruebaComponent},
      {path: 'app-pos-logi',component:PosLogiComponent },
      {path: '', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-home', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-articulos', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-clientes', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-pedido', redirectTo: 'app-pos-logi', pathMatch: 'full'},
/*       {path: '/', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-log', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-lo', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-l', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-pos-', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-po', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-p', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app-', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'app', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'ap', redirectTo: 'app-pos-logi', pathMatch: 'full'},
      {path: 'a', redirectTo: 'app-pos-logi', pathMatch: 'full'}, */
      {path: 'app-pos-home/:id',component:PosHomeComponent,  canActivate: [VigilanteGuard] },
      {path: 'app-pos-articulos/:id', component:PosArticulosComponent,  canActivate: [VigilanteGuard] },
      {path: 'app-popup-existencias' , component:PopupExistenciasComponent,  canActivate: [VigilanteGuard]},
      {path: 'app-pos-clientes/:id', component:PosClientesComponent,  canActivate: [VigilanteGuard] },
      {path: 'app-pos-pedido/:id', component:PosPedidoComponent ,  canActivate: [VigilanteGuard]}
    ];



@NgModule({
  imports: [RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
