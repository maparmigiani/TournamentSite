import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentAddPlayerComponent } from './tournament-add-player.component';

describe('TournamentAddPlayerComponent', () => {
  let component: TournamentAddPlayerComponent;
  let fixture: ComponentFixture<TournamentAddPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentAddPlayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentAddPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
