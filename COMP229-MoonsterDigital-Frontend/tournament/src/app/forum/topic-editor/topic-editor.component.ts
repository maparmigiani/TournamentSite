/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/model/topic.model';
import { TopicRepo } from 'src/app/model/topic.repository';

@Component({
  selector: 'app-topic-editor',
  templateUrl: './topic-editor.component.html',
  styleUrls: ['./topic-editor.component.scss']
})
export class TopicEditorComponent implements OnInit {
  title!: string;

  editing = false;
  topic: Topic = new Topic();
  topicForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private repository: TopicRepo,
    private router: Router,
    private route: ActivatedRoute) { }

  createTopicForm() {

    this.topicForm = this.formBuilder.group({
      id: [],
      username: [this.repository.username],
      date: [], //TODO
      topicTitle: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.editing = this.route.snapshot.params['mode'] === 'edit';
    this.title = this.editing ? 'Edit Topic' : 'Add Topic';
    this.createTopicForm();
  }

  onSubmit() {
    this.topicForm.value.date = Date.now();
    console.log(this.topicForm.value);

    this.repository.saveTopic(this.topicForm.value);
    this.router.navigateByUrl('/forum/topic');
  }
}
