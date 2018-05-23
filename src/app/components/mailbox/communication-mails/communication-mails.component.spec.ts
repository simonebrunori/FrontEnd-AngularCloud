import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationMailsComponent } from './communication-mails.component';

describe('CommunicationMailsComponent', () => {
  let component: CommunicationMailsComponent;
  let fixture: ComponentFixture<CommunicationMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
