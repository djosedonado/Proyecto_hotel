import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitacionEditaComponent } from './habitacion-edita.component';

describe('HabitacionEditaComponent', () => {
  let component: HabitacionEditaComponent;
  let fixture: ComponentFixture<HabitacionEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitacionEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitacionEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
