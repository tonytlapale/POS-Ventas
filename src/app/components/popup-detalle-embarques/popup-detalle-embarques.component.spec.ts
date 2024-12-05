import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDetalleEmbarquesComponent } from './popup-detalle-embarques.component';

describe('PopupDetalleEmbarquesComponent', () => {
  let component: PopupDetalleEmbarquesComponent;
  let fixture: ComponentFixture<PopupDetalleEmbarquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupDetalleEmbarquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDetalleEmbarquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
