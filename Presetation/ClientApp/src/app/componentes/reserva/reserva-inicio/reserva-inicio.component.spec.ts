import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaInicioComponent } from './reserva-inicio.component';

describe('ReservaInicioComponent', () => {
  let component: ReservaInicioComponent;
  let fixture: ComponentFixture<ReservaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
