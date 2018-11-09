import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicManagerComponent } from './comic-manager.component';

describe('ComicManagerComponent', () => {
  let component: ComicManagerComponent;
  let fixture: ComponentFixture<ComicManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
