import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketQfEditComponent } from './bracket-qf-edit.component';

describe('BracketQfEditComponent', () => {
  let component: BracketQfEditComponent;
  let fixture: ComponentFixture<BracketQfEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketQfEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketQfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
