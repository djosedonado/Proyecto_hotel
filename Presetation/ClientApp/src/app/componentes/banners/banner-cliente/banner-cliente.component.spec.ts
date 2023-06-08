import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerClienteComponent } from './banner-cliente.component';

describe('BannerClienteComponent', () => {
  let component: BannerClienteComponent;
  let fixture: ComponentFixture<BannerClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
