import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosPedidoComponent } from './pos-pedido.component';

describe('PosPedidoComponent', () => {
  let component: PosPedidoComponent;
  let fixture: ComponentFixture<PosPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosPedidoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
