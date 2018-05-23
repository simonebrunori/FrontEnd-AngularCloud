import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashMailsComponent } from './trash-mails.component';

describe('TrashMailsComponent', () => {
  let component: TrashMailsComponent;
  let fixture: ComponentFixture<TrashMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
