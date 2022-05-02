import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Rounds } from 'src/app/model/rounds.model';
import { RoundsRepo } from 'src/app/model/rounds.repository';
import { TournamentRepo } from 'src/app/model/tournament.repository';

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit {
  title!: string;
  tournamentId!: number;
  rounds: Rounds = new Rounds();
  player1!: String;
  player2!: String;
  player3!: String;
  player4!: String;
  player5!: String;
  player6!: String;
  player7!: String;
  player8!: String;
  player9!: String;
  player10!: String;
  player11!: String;
  player12!: String;
  player13!: String;
  player14!: String;
  player15!: String;
  
  constructor(private repository: RoundsRepo,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.title = this.activeRoute.snapshot.data['title'];
      this.tournamentId = this.activeRoute.snapshot.params["id"];
  
      let cloneObj = Object.assign(this.rounds, this.repository.getRoundsByTournamentId(this.activeRoute.snapshot.params['id']));

      console.log(cloneObj);

      if (cloneObj != null && cloneObj._id != undefined) {
        // Quarter-Finals
        this.player1 = cloneObj!.QuarterFinal!.team1![0]!.displayName!;
        this.player2 = cloneObj!.QuarterFinal!.team2![0]!.displayName!;
        this.player3 = cloneObj!.QuarterFinal!.team3![0]!.displayName!;
        this.player4 = cloneObj!.QuarterFinal!.team4![0]!.displayName!;
        this.player5 = cloneObj!.QuarterFinal!.team5![0]!.displayName!;
        this.player6 = cloneObj!.QuarterFinal!.team6![0]!.displayName!;
        this.player7 = cloneObj!.QuarterFinal!.team7![0]!.displayName!;
        this.player8 = cloneObj!.QuarterFinal!.team8![0]!.displayName!;

        // Semi-Finals
        if (cloneObj!.SemiFinal!.team1![0] !== undefined)
          this.player9 = cloneObj!.SemiFinal!.team1![0]!.displayName!;
        if (cloneObj!.SemiFinal!.team2![0] !== undefined)
          this.player10 = cloneObj!.SemiFinal!.team2![0]!.displayName!;
        if (cloneObj!.SemiFinal!.team3![0] !== undefined)
          this.player11 = cloneObj!.SemiFinal!.team3![0]!.displayName!;
        if (cloneObj!.SemiFinal!.team3![0] !== undefined)
          this.player12 = cloneObj!.SemiFinal!.team4![0]!.displayName!;

        // Finals
        if (cloneObj!.Final!.team1![0] !== undefined)
          this.player13 = cloneObj!.Final!.team1![0]!.displayName!;
        if (cloneObj!.Final!.team2![0] !== undefined)
          this.player14 = cloneObj!.Final!.team2![0]!.displayName!;

          // Winner
        if (cloneObj!.Winner![0] !== undefined)
          this.player15 = cloneObj!.Winner![0]!.displayName!;
      }
    }
  
    returnToTournamentList() {
      this.router.navigateByUrl('/tournament/list');
    }
}
