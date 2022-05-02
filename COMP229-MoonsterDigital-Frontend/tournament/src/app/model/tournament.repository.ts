import { Injectable } from '@angular/core';
import { Tournament } from './tournament.model';
import { StaticDataSource } from './static.datasource';
import { User } from './user.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class TournamentRepo {
    private tournaments: Tournament[] = [];

    constructor(private dataSource: RestDataSource) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getTournaments().subscribe(data => {
            for (var i = 0; i < data.length; i++) {
                data[i].players = data[i].players?.toString().split(',').join(', ');
            }
            this.tournaments = data;
            this.storeTournamentData(data);
        });
    }

    storeTournamentData(tournaments: Tournament[]) {
      localStorage.setItem('tournaments', JSON.stringify(tournaments));
      this.tournaments = tournaments;
    }
  
    loadTournaments(): void{
      this.tournaments = JSON.parse(localStorage.getItem('tournaments')!);
    }

    getTournament(id: any): Tournament {
        this.loadTournaments();
        return this.tournaments.find(b => b._id == id)!;
    }

    getAllTournaments(){
        this.loadTournaments();        
        return this.tournaments;
    }

    getActiveTournaments() {
        this.loadTournaments();
        return this.tournaments.filter(a => a.isActive === true);
    }

    modifyTournament(savedTournament: Tournament, id: any): void {
        if (savedTournament._id === null || savedTournament._id === 0) {
            this.dataSource.addTournaments(savedTournament).subscribe(b => {
                this.refresh();//this.tournaments.push(savedTournament);
            });
        }
        else {
            this.dataSource.editTournament(savedTournament).subscribe(tournament => {
                this.refresh();//this.tournaments.splice(this.tournaments.findIndex(b => b._id === savedTournament._id), 1, savedTournament);
            });
        }
    }

    createTournament(data: any) {
        this.tournaments.push(data);
    }

    deleteTournament(deletedTourID: number): void {

        this.dataSource.deleteTournament(deletedTourID).subscribe(tournament => {
            this.refresh();//this.tournaments.splice(this.tournaments.findIndex(b => b._id === deletedTourID), 1);
        });
    }

    get authenticated(): boolean {
        return this.dataSource.loggedIn();
    }

    get username(): String {
        return this.dataSource.getUsername();
    }
}
