import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosArticulosComponent } from './pos-articulos.component';

describe('PosArticulosComponent', () => {
  let component: PosArticulosComponent;
  let fixture: ComponentFixture<PosArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
