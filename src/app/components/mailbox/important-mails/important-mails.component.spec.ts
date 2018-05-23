import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantMailsComponent } from './important-mails.component';

describe('ImportantMailsComponent', () => {
  let component: ImportantMailsComponent;
  let fixture: ComponentFixture<ImportantMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportantMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportantMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
