/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date April 06th 2022
 * @CourseName Web Application Development SEC005
 */

import { Injectable } from '@angular/core';
import { RestDataSource } from './rest.datasource';
import { TournamentRepo } from './tournament.repository';
import { Rounds } from './rounds.model';
import { BulkWriteRounds } from './bulkwriterounds.model';
import { Router } from '@angular/router';

@Injectable()
export class RoundsRepo {
    private rounds: Rounds[] = [];

    constructor(private dataSource: RestDataSource,
        private tournamentRepo: TournamentRepo,
        private router: Router) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getRounds().subscribe(data => {
            this.rounds = data;
            this.storeRoundData(data);
        });
    }

    refreshNextPage(link: string): void{
        this.dataSource.getRounds().subscribe(data => {
            this.rounds = data;
            this.storeRoundData(data);
            this.router.navigateByUrl(link);
        });
    }

    storeRoundData(rounds: Rounds[]) {
      localStorage.setItem('rounds', JSON.stringify(rounds));
      this.rounds = rounds;
    }
  
    loadRounds(): void{
      this.rounds = JSON.parse(localStorage.getItem('rounds')!);
    }

    getRounds() {
        this.loadRounds();
        return this.rounds;
    }

    getRoundsByTournamentId(tournamentId: number){
        this.loadRounds();
        return this.rounds.find(a => a.TournamentId === tournamentId);
    }

    upsertQuarterFinals(winners: any, tournamentId: number): void {        
        this.dataSource.upsertQuarterFinalResults(winners).subscribe(b => {
            this.refresh();
            this.tournamentRepo.refresh();
            this.refreshNextPage('/tournament/bracket-sf-edit/' + tournamentId);
        });
    }

    upsertSemiFinals(winners: any, tournamentId: number): void {        
        this.dataSource.upsertSemiFinalResults(winners).subscribe(b => {
            this.refresh();
            this.tournamentRepo.refresh();
            this.refreshNextPage('/tournament/bracket-final-edit/' + tournamentId);
        });
    }

    upsertFinals(winners: any, tournamentId: number): void {        
        this.dataSource.upsertFinalResults(winners).subscribe(b => {
            this.refresh();
            this.tournamentRepo.refresh();
            this.refreshNextPage('/tournament/bracket/' + tournamentId);
        });
    }

    get authenticated(): boolean
    {
      return this.dataSource.loggedIn();
    }
}