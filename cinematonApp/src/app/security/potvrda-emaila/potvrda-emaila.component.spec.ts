import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdaEmailaComponent } from './potvrda-emaila.component';

describe('PotvrdaEmailaComponent', () => {
  let component: PotvrdaEmailaComponent;
  let fixture: ComponentFixture<PotvrdaEmailaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotvrdaEmailaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotvrdaEmailaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
