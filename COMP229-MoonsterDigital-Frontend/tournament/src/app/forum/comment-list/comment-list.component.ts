/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

 import { Component, OnInit } from '@angular/core';
 import { ActivatedRoute, Router } from '@angular/router';
 import { Comment } from 'src/app/model/comment.model';
 import { CommentRepo } from 'src/app/model/comment.repository';
 import { Topic } from 'src/app/model/topic.model';
 import { TopicRepo } from 'src/app/model/topic.repository';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  title!: string;
  topicId!: string;

  constructor(private commentRepo: CommentRepo,
              private topicRepo: TopicRepo,
              private route: ActivatedRoute,
              private router: Router) { 
                this.topicId = route.snapshot.params['id'];
              }

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'];
    this.commentRepo.refresh();
  }

  get comments(): Comment[] {
    return this.commentRepo.getCommentsByTopicId(this.topicId);
  }

  get topic(): Topic {
    return this.topicRepo.getTopic(this.topicId);
  }

  addComment(topicId: number): void
  {
    this.router.navigateByUrl('/forum/comment/add/' + topicId);
  }

  getSplittedISODateString(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  isLoggedIn(): boolean
  {    
    return this.topicRepo.authenticated;
  }
}
