import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesManagerComponent } from './favorites-manager.component';

describe('FavoritesManagerComponent', () => {
  let component: FavoritesManagerComponent;
  let fixture: ComponentFixture<FavoritesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
