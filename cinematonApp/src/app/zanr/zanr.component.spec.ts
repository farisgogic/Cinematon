import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZanrComponent } from './zanr.component';

describe('ZanrComponent', () => {
  let component: ZanrComponent;
  let fixture: ComponentFixture<ZanrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZanrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZanrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
