import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupExistenciasComponent } from './popup-existencias.component';

describe('PopupExistenciasComponent', () => {
  let component: PopupExistenciasComponent;
  let fixture: ComponentFixture<PopupExistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupExistenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
