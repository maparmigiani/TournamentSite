/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 30th 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/model/comment.model';
import { CommentRepo } from 'src/app/model/comment.repository';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent implements OnInit {
  title!: string;
  topicId!: number;
  editing = false;
  comment: Comment = new Comment();
  commentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private repository: CommentRepo,
    private router: Router,
    private route: ActivatedRoute) { }

  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      id: [],
      topicId: [this.topicId],
      username: [this.repository.username],
      date: [], //TODO
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {    
    this.editing = this.route.snapshot.params['mode'] === 'edit';
    this.topicId = this.route.snapshot.params['topicId'];
    this.title = this.editing ? 'Edit Comment' : 'Add Comment';
    this.createCommentForm();
  }

  onSubmit() {
    this.commentForm.value.date = Date.now();
    console.log(this.commentForm.value)

    this.repository.saveComment(this.commentForm.value);
    this.router.navigateByUrl('/forum/comment/' + this.topicId);
  }

  returnToTopic(): void {
    this.router.navigateByUrl('/forum/comment/' + this.topicId);
  }
}
