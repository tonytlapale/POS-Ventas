import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosLogiComponent } from './pos-logi.component';

describe('PosLogiComponent', () => {
  let component: PosLogiComponent;
  let fixture: ComponentFixture<PosLogiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosLogiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosLogiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
