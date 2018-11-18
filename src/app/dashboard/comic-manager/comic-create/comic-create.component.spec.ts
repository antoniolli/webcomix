import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicCreateComponent } from './comic-create.component';

describe('ComicCreateComponent', () => {
  let component: ComicCreateComponent;
  let fixture: ComponentFixture<ComicCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
