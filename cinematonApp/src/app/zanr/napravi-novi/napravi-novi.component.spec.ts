import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NapraviNoviComponent } from './napravi-novi.component';

describe('NapraviNoviComponent', () => {
  let component: NapraviNoviComponent;
  let fixture: ComponentFixture<NapraviNoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NapraviNoviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NapraviNoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
