import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisestrukiOdabirComponent } from './visestruki-odabir.component';

describe('VisestrukiOdabirComponent', () => {
  let component: VisestrukiOdabirComponent;
  let fixture: ComponentFixture<VisestrukiOdabirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisestrukiOdabirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisestrukiOdabirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
