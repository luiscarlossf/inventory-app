import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerCardsComponent } from './server-cards.component';

describe('ServerCardsComponent', () => {
  let component: ServerCardsComponent;
  let fixture: ComponentFixture<ServerCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
