import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PosLogiComponent } from './components/pos-logi/pos-logi.component';
import { PosHomeComponent } from './components/pos-home/pos-home.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { PosLogiPruebaComponent } from './components/pos-logi-prueba/pos-logi-prueba.component';
import { PosArticulosComponent } from './components/pos-articulos/pos-articulos.component';
import {NgPipesModule} from 'ngx-pipes';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator   } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PopupExistenciasComponent } from './components/popup-existencias/popup-existencias.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { PosClientesComponent } from './components/pos-clientes/pos-clientes.component';
import { PopupDetalleClienteComponent } from './components/popup-detalle-cliente/popup-detalle-cliente.component';
import { PopupDetalleEmbarquesComponent } from './components/popup-detalle-embarques/popup-detalle-embarques.component';
import { PosPedidoComponent } from './components/pos-pedido/pos-pedido.component';
import { PopupPedidoDetalleClienteComponent } from './components/popup-pedido-detalle-cliente/popup-pedido-detalle-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    PosLogiComponent,
    PosHomeComponent,
    PosLogiPruebaComponent,
    PosArticulosComponent,
    PopupExistenciasComponent,
    PosClientesComponent,
    PopupDetalleClienteComponent,
    PopupDetalleEmbarquesComponent,
    PosPedidoComponent,
    PopupPedidoDetalleClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgPipesModule,
    SweetAlert2Module,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule ,
    NgxSpinnerModule  ,
    MatDialogModule ,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule

  ],
  providers: [CookieService, SweetAlert2Module, MatPaginator,
   MatPaginatorModule, NgxSpinnerModule,MatDialogModule, MatFormFieldModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
