import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetalleClienteComponent } from './popup-detalle-cliente.component';

describe('PopupDetalleClienteComponent', () => {
  let component: PopupDetalleClienteComponent;
  let fixture: ComponentFixture<PopupDetalleClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDetalleClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDetalleClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
