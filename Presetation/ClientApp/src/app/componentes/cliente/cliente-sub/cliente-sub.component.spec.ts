import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteSubComponent } from './cliente-sub.component';

describe('ClienteSubComponent', () => {
  let component: ClienteSubComponent;
  let fixture: ComponentFixture<ClienteSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
