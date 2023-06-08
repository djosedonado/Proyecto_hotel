import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerRecepcionistaComponent } from './banner-recepcionista.component';

describe('BannerRecepcionistaComponent', () => {
  let component: BannerRecepcionistaComponent;
  let fixture: ComponentFixture<BannerRecepcionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerRecepcionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerRecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
