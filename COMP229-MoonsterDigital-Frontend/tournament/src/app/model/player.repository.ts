/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date April 06th 2022
 * @CourseName Web Application Development SEC005
 */

import { Injectable } from '@angular/core';
import { Player } from './player.model';
import { RestDataSource } from './rest.datasource';
import { BulkWritePlayers } from './bulkwriteplayers.model';
import { TournamentRepo } from './tournament.repository';
import { RoundsRepo } from './rounds.repository';

@Injectable()
export class PlayerRepo {
    private players: Player[] = [];
    private bulkWritePlayers: BulkWritePlayers[] = [];

    constructor(private dataSource: RestDataSource,
        private tournamentRepo: TournamentRepo,
        private roundsRepo: RoundsRepo) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getRegisteredPlayers().subscribe(data => {
            this.players = data;
            this.storePlayersData(data);
        });
        this.dataSource.getBulkWritePlayers().subscribe(data => {
            this.bulkWritePlayers = data;
            this.storeBulkWritePlayersData(data);
        });
    }

    storePlayersData(players: Player[]) {
      localStorage.setItem('players', JSON.stringify(players));
      this.players = players;
    }
  
    loadPlayers(): void{
      this.players = JSON.parse(localStorage.getItem('players')!);
    }

    storeBulkWritePlayersData(bulkWritePlayers: BulkWritePlayers[]) {
        localStorage.setItem('bulkWritePlayers', JSON.stringify(bulkWritePlayers));
        this.bulkWritePlayers = bulkWritePlayers;
    }

    loadBulkWritePlayers(): void {
        this.bulkWritePlayers = JSON.parse(localStorage.getItem('bulkWritePlayers')!);
    }

    getPlayers() {
        this.loadPlayers();
        return this.players;
    }

    getPlayersByTournamentId(tournamentId: any){
        this.loadPlayers();
        return this.players.filter(a => a.tournamentId === tournamentId);
    }

    getPlayer(id: any)
    {
        this.loadPlayers();
        return this.players.find(b => b._id == id)!;
    }

    getBulkWritePlayerByTournamentId(tournamentId: number) {
        this.loadBulkWritePlayers();
        return this.bulkWritePlayers.find(b => b.tournamentId == tournamentId)!;
    }

    bulkWritePlayer(bulkWritePlayers: BulkWritePlayers): void {        
        this.dataSource.bulkWriteRegisteredPlayers(bulkWritePlayers).subscribe(b => {
            this.refresh();
            this.tournamentRepo.refresh();
            this.roundsRepo.refresh();
        });
    }
}