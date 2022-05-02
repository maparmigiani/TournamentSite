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
   selector: 'app-bracket-final-edit',
   templateUrl: './bracket-final-edit.component.html',
   styleUrls: ['./bracket-final-edit.component.scss']
 })
 export class BracketFinalEditComponent implements OnInit {
   title!: string;
   tournamentId!: number;
   rounds: Rounds = new Rounds();
   winnerForm!: FormGroup;
   player1!: String;
   player2!: String;
   team1!: String;
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
       if (cloneObj!.Final!.team1![0] !== undefined)
         this.player1 = cloneObj!.Final!.team1![0]!.displayName!;
       if (cloneObj!.Final!.team2![0] !== undefined)
         this.player2 = cloneObj!.Final!.team2![0]!.displayName!;
         
       if (cloneObj!.Winner![0]!== undefined)
         this.team1 = cloneObj!.Winner![0]!.displayName!;  
     }
     this.createWinnerForm();

     if (this.player1 !== "" && this.player1 != null && this.player1 !== undefined &&
       this.player2 !== "" && this.player2 != null && this.player2 !== undefined)
       this.enableSubmission = true;
     else
       this.enableSubmission = false;
   }
 
   createWinnerForm() {
     this.winnerForm = this.formBuilder.group({
       tournamentId: this.tournamentId,
       team1: [null],
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
   }
 
   onSubmit() {
     console.log(this.winnerForm.value);
     this.repository.upsertFinals(this.winnerForm.value, this.tournamentId);
   }
 
   returnToTournamentList() {
     this.router.navigateByUrl('/tournament/list');
   }
 
   isLoggedIn(): boolean {
     return this.repository.authenticated;
   }
 }
 