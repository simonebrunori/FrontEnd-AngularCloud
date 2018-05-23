import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkMailsComponent } from './homework-mails.component';

describe('HomeworkMailsComponent', () => {
  let component: HomeworkMailsComponent;
  let fixture: ComponentFixture<HomeworkMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeworkMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
