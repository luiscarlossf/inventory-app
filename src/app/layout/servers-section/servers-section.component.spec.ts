import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServersSectionComponent } from './servers-section.component';

describe('ServersSectionComponent', () => {
  let component: ServersSectionComponent;
  let fixture: ComponentFixture<ServersSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServersSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
