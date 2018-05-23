import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMailsComponent } from './new-mails.component';

describe('NewMailsComponent', () => {
  let component: NewMailsComponent;
  let fixture: ComponentFixture<NewMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
