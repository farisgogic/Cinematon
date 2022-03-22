import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZanrComponent } from './form-zanr.component';

describe('FormZanrComponent', () => {
  let component: FormZanrComponent;
  let fixture: ComponentFixture<FormZanrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormZanrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormZanrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
