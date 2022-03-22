import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditZanrComponent } from './edit-zanr.component';

describe('EditZanrComponent', () => {
  let component: EditZanrComponent;
  let fixture: ComponentFixture<EditZanrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditZanrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditZanrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
