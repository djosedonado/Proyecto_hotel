import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaEditaComponent } from './recepcionista-edita.component';

describe('RecepcionistaEditaComponent', () => {
  let component: RecepcionistaEditaComponent;
  let fixture: ComponentFixture<RecepcionistaEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepcionistaEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepcionistaEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
