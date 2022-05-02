/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Apr 15th 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rounds } from 'src/app/model/rounds.model';
import { RoundsRepo } from 'src/app/model/rounds.repository';

@Component({
  selector: 'app-bracket-qf-edit',
  templateUrl: './bracket-qf-edit.component.html',
  styleUrls: ['./bracket-qf-edit.component.scss']
})
export class BracketQfEditComponent implements OnInit {
  title!: string;
  tournamentId!: number;
  rounds: Rounds = new Rounds();
  winnerForm!: FormGroup;
  player1!: String;
  player2!: String;
  player3!: String;
  player4!: String;
  player5!: String;
  player6!: String;
  player7!: String;
  player8!: String;
  team1!: String;
  team2!: String;
  team3!: String;
  team4!: String;
  enableSubmission = false;

  constructor(private formBuilder: FormBuilder,
    private repository: RoundsRepo,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.title = this.activeRoute.snapshot.data['title'];
    this.tournamentId = this.activeRoute.snapshot.params["id"];

    let cloneObj = Object.assign(this.rounds, this.repository.getRoundsByTournamentId(this.activeRoute.snapshot.params['id']));

    console.log(cloneObj);

    if (cloneObj != null && cloneObj._id != undefined) {

      this.player1 = cloneObj!.QuarterFinal!.team1![0]!.displayName!;
      this.player2 = cloneObj!.QuarterFinal!.team2![0]!.displayName!;
      this.player3 = cloneObj!.QuarterFinal!.team3![0]!.displayName!;
      this.player4 = cloneObj!.QuarterFinal!.team4![0]!.displayName!;
      this.player5 = cloneObj!.QuarterFinal!.team5![0]!.displayName!;
      this.player6 = cloneObj!.QuarterFinal!.team6![0]!.displayName!;
      this.player7 = cloneObj!.QuarterFinal!.team7![0]!.displayName!;
      this.player8 = cloneObj!.QuarterFinal!.team8![0]!.displayName!;

      if (cloneObj!.SemiFinal!.team1![0] !== undefined)
        this.team1 = cloneObj!.SemiFinal!.team1![0]!.displayName!;

      if (cloneObj!.SemiFinal!.team2![0] !== undefined)
        this.team2 = cloneObj!.SemiFinal!.team2![0]!.displayName!;  

      if (cloneObj!.SemiFinal!.team3![0] !== undefined)
        this.team3 = cloneObj!.SemiFinal!.team3![0]!.displayName!;  

      if (cloneObj!.SemiFinal!.team3![0] !== undefined)
        this.team4 = cloneObj!.SemiFinal!.team4![0]!.displayName!; 
    }
    this.createWinnerForm();

    if (this.player1 !== "" && this.player1 != null && this.player1 !== undefined &&
      this.player2 !== "" && this.player2 != null && this.player2 !== undefined &&
      this.player3 !== "" && this.player3 != null && this.player3 !== undefined &&
      this.player4 !== "" && this.player4 != null && this.player4 !== undefined &&
      this.player5 !== "" && this.player5 != null && this.player5 !== undefined &&
      this.player6 !== "" && this.player6 != null && this.player6 !== undefined &&
      this.player7 !== "" && this.player7 != null && this.player7 !== undefined &&
      this.player8 !== "" && this.player8 != null && this.player8 !== undefined)
      this.enableSubmission = true;
    else
      this.enableSubmission = false;
  }

  createWinnerForm() {
    this.winnerForm = this.formBuilder.group({
      tournamentId: this.tournamentId,
      team1: [null],
      team2: [null],
      team3: [null],
      team4: [null],
    });

    if (this.team1 != null) {
      switch(this.team1) { 
        case this.player1: { 
          this.winnerForm.patchValue({ team1: "one" });
           break; 
        } 
        case this.player2: { 
          this.winnerForm.patchValue({ team1: "two" });
           break; 
        }
        default:{
          break;
        }
     }
    }

    if (this.team2 != null) {
      switch(this.team2) { 
        case this.player3: { 
          this.winnerForm.patchValue({ team2: "one" });
           break; 
        } 
        case this.player4: { 
          this.winnerForm.patchValue({ team2: "two" });
           break; 
        }
        default:{
          break;
        }
     }
    }

    if (this.team3 != null) {
      switch(this.team3) { 
        case this.player5: { 
          this.winnerForm.patchValue({ team3: "one" });
           break; 
        } 
        case this.player6: { 
          this.winnerForm.patchValue({ team3: "two" });
           break; 
        }
        default:{
          break;
        }
     }
    }

    if (this.team4 != null)
    {
      switch(this.team4) { 
        case this.player7: { 
          this.winnerForm.patchValue({ team4: "one" });
           break; 
        } 
        case this.player8: { 
          this.winnerForm.patchValue({ team4: "two" });
           break; 
        }
        default:{
          break;
        }
     }
    }
  }

  onSubmit() {
    console.log(this.winnerForm.value);
    this.repository.upsertQuarterFinals(this.winnerForm.value, this.tournamentId);
  }

  returnToTournamentList() {
    this.router.navigateByUrl('/tournament/list');
  }

  isLoggedIn(): boolean {
    return this.repository.authenticated;
  }
}
