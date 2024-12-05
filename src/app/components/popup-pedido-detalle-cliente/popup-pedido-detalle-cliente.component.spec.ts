import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPedidoDetalleClienteComponent } from './popup-pedido-detalle-cliente.component';

describe('PopupPedidoDetalleClienteComponent', () => {
  let component: PopupPedidoDetalleClienteComponent;
  let fixture: ComponentFixture<PopupPedidoDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPedidoDetalleClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPedidoDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
