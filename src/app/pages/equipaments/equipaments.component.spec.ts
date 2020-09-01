import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentsComponent } from './equipaments.component';

describe('EquipamentsComponent', () => {
  let component: EquipamentsComponent;
  let fixture: ComponentFixture<EquipamentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
