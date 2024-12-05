import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosLogiPruebaComponent } from './pos-logi-prueba.component';

describe('PosLogiPruebaComponent', () => {
  let component: PosLogiPruebaComponent;
  let fixture: ComponentFixture<PosLogiPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosLogiPruebaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosLogiPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
