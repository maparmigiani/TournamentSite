/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 30th 2022
 * @CourseName Web Application Development SEC005
 */

 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
 import { Tournament } from 'src/app/model/tournament.model';
 import { TournamentRepo } from 'src/app/model/tournament.repository';

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.scss']
})
export class TournamentListComponent implements OnInit {
  title!: string;

  constructor(private repository: TournamentRepo,
              private route: ActivatedRoute,
              private router: Router){  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.repository.refresh();
  }

  get tournaments(): Tournament[]
  {
    return this.repository.getAllTournaments();
  }

  editTournament(id: number): void
  {
    this.router.navigateByUrl('/tournament/edit/' + id);
  }

  registerPlayers(id: number): void
  {
    this.router.navigateByUrl('/tournament/player/' + id);
  }

  editQuarterFinals(id: number): void
  {
    this.router.navigateByUrl('/tournament/bracket-qf-edit/' + id);
  }
  
  editSemiFinals(id: number): void
  {
    this.router.navigateByUrl('/tournament/bracket-sf-edit/' + id);
  }
  
  editFinals(id: number): void
  {
    this.router.navigateByUrl('/tournament/bracket-final-edit/' + id);
  }

  viewSummary(id: number): void
  {
    this.router.navigateByUrl('/tournament/bracket/' + id);
  }

  deleteTournament(id: number): void
  {
    this.repository.deleteTournament(id);
    this.router.navigateByUrl('/tournament/list');
  }

  getSplittedISODateString(date: Date): string
  {
    return new Date(date).toISOString().split('T')[0];
  }

  isLoggedIn(): boolean
  {    
    return this.repository.authenticated;
  }

  isOwner(owner: String): boolean{
    return this.repository.username == owner;
  }
}
