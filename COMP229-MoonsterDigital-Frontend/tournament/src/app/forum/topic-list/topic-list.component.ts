/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/model/topic.model';
import { TopicRepo } from 'src/app/model/topic.repository';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {
  title!: string;

  constructor(private topicRepo: TopicRepo,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.topicRepo.refresh();
  }

  get topics(): Topic[] {
    return this.topicRepo.getTopics();
  }

  viewComment(id: number): void
  {
    this.router.navigateByUrl('/forum/comment/' + id);
  }

  getSplittedISODateString(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  isLoggedIn(): boolean
  {    
    return this.topicRepo.authenticated;
  }
}
