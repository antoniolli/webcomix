import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicEditComponent } from './comic-edit.component';

describe('ComicEditComponent', () => {
  let component: ComicEditComponent;
  let fixture: ComponentFixture<ComicEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
