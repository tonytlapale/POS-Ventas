import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosClientesComponent } from './pos-clientes.component';

describe('PosClientesComponent', () => {
  let component: PosClientesComponent;
  let fixture: ComponentFixture<PosClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosClientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
