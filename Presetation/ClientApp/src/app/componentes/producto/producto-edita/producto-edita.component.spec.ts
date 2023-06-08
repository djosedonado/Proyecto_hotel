import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditaComponent } from './producto-edita.component';

describe('ProductoEditaComponent', () => {
  let component: ProductoEditaComponent;
  let fixture: ComponentFixture<ProductoEditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoEditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoEditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
