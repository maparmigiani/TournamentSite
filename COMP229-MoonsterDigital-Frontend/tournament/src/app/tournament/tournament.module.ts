/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 30th 2022
 * @CourseName Web Application Development SEC005
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentEditorComponent } from './tournament-editor/tournament-editor.component';
import { AuthGuard } from '../admin/auth/auth.guard';
import { TournamentAddPlayerComponent } from './tournament-add-player/tournament-add-player.component';
import { BracketComponent } from './bracket/bracket.component';
import { BracketQfEditComponent } from './bracket-qf-edit/bracket-qf-edit.component';
import { BracketSfEditComponent } from './bracket-sf-edit/bracket-sf-edit.component';
import { BracketFinalEditComponent } from './bracket-final-edit/bracket-final-edit.component';

const routes = RouterModule.forChild([
  { path: 'list', component: TournamentListComponent, data: { title: 'Tournaments' } },
  { path: 'player/:id', component: TournamentAddPlayerComponent, canActivate: [AuthGuard] },
  { path: 'bracket/:id', component: BracketComponent, data: { title: 'Bracket Summary' } },
  { path: 'bracket-qf-edit/:id', component: BracketQfEditComponent, data: { title: 'Quarter-Finals' } },
  { path: 'bracket-sf-edit/:id', component: BracketSfEditComponent, data: { title: 'Semi-Finals' } },
  { path: 'bracket-final-edit/:id', component: BracketFinalEditComponent, data: { title: 'Finals' } },
  { path: ':mode', component: TournamentEditorComponent, canActivate: [AuthGuard] },
  { path: ':mode/:id', component: TournamentEditorComponent, canActivate: [AuthGuard] },
]);

@NgModule({
  imports: [ModelModule, CommonModule, FormsModule, ReactiveFormsModule, routes],
  providers: [AuthGuard],
  declarations: [TournamentListComponent, TournamentAddPlayerComponent,TournamentEditorComponent, 
    BracketComponent, BracketQfEditComponent, BracketSfEditComponent, BracketFinalEditComponent]
})
export class TournamentModule {}
