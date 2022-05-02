import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketFinalEditComponent } from './bracket-final-edit.component';

describe('BracketFinalEditComponent', () => {
  let component: BracketFinalEditComponent;
  let fixture: ComponentFixture<BracketFinalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketFinalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketFinalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
