import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaRegistroComponent } from './recepcionista-registro.component';

describe('RecepcionistaRegistroComponent', () => {
  let component: RecepcionistaRegistroComponent;
  let fixture: ComponentFixture<RecepcionistaRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionistaRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
