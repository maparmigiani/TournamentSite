/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tournament } from 'src/app/model/tournament.model';
import { TournamentRepo } from 'src/app/model/tournament.repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title!: string;

  constructor(private repository: TournamentRepo,
              private route: ActivatedRoute){  }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
  }

  get tournaments(): Tournament[]
  {
    return this.repository.getActiveTournaments();
  }

  getSplittedISODateString(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }
}
