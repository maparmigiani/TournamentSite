import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './pages/home/home.component';
import { BracketComponent } from './tournament/bracket/bracket.component';
import { BracketFinalEditComponent } from './tournament/bracket-final-edit/bracket-final-edit.component';
import { BracketQfEditComponent } from './tournament/bracket-qf-edit/bracket-qf-edit.component';
import { BracketSfEditComponent } from './tournament/bracket-sf-edit/bracket-sf-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'forum', loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule)},
  { path: 'tournament', loadChildren: () => import('./tournament/tournament.module').then(m => m.TournamentModule)},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
