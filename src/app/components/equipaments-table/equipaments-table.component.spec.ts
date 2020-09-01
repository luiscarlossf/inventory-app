import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentsTableComponent } from './equipaments-table.component';

describe('EquipamentsTableComponent', () => {
  let component: EquipamentsTableComponent;
  let fixture: ComponentFixture<EquipamentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
