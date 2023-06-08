import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEditaComponent } from './reserva-edita.component';

describe('ReservaEditaComponent', () => {
  let component: ReservaEditaComponent;
  let fixture: ComponentFixture<ReservaEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
