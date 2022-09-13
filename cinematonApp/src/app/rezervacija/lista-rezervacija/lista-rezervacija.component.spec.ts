import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRezervacijaComponent } from './lista-rezervacija.component';

describe('ListaRezervacijaComponent', () => {
  let component: ListaRezervacijaComponent;
  let fixture: ComponentFixture<ListaRezervacijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRezervacijaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRezervacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
