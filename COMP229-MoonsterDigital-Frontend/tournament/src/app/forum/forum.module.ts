/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 30th 2022
 * @CourseName Web Application Development SEC005
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BrowserModule } from '@angular/platform-browser';
import { ModelModule } from '../model/model.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TopicListComponent } from './topic-list/topic-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { TopicEditorComponent } from './topic-editor/topic-editor.component';
import { CommentEditorComponent } from './comment-editor/comment-editor.component';
import { AuthGuard } from '../admin/auth/auth.guard';

const routes = RouterModule.forChild([
  {
    path: 'topic', component: TopicListComponent, data: { title: 'Forum' },
  },
  {
    path: 'topic/:mode', component: TopicEditorComponent, canActivate: [AuthGuard]
  },
  {
    path: 'comment/:id', component: CommentListComponent, data: { title: 'View a Topic' },
  },
  {
    path: 'comment/:mode/:topicId', component: CommentEditorComponent, canActivate: [AuthGuard]
  },
]);

@NgModule({
  imports: [ModelModule, CommonModule, FormsModule, ReactiveFormsModule, routes],
  declarations: [TopicListComponent, CommentListComponent, TopicEditorComponent, CommentEditorComponent],
  providers: [AuthGuard],
  exports: [TopicListComponent, CommentListComponent]
})
export class ForumModule {}
