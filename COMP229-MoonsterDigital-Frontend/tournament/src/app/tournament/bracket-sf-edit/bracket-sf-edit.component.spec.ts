import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BracketSfEditComponent } from './bracket-sf-edit.component';

describe('BracketSfEditComponent', () => {
  let component: BracketSfEditComponent;
  let fixture: ComponentFixture<BracketSfEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BracketSfEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketSfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
