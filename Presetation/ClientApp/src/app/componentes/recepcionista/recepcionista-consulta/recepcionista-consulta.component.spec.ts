import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaConsultaComponent } from './recepcionista-consulta.component';

describe('RecepcionistaConsultaComponent', () => {
  let component: RecepcionistaConsultaComponent;
  let fixture: ComponentFixture<RecepcionistaConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionistaConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistaConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
