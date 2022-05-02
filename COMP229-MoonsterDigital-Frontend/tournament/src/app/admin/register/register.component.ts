/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 1st 2022
 * @CourseName Web Application Development SEC005
 */

import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title!: string;
  userForm!: FormGroup;
  errorMessage: string | undefined;
  successMessage: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {
    this.createUserForm();
  }

  ngOnInit() {
    this.title = this.route.snapshot.data['title'];
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      _id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      displayName: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.userForm.value)
    this.authService.saveUser(this.userForm.value).subscribe(b => {
      if (b.success) {
        this.successMessage = b.msg;
        this.router.navigateByUrl('/admin/login');
      }
      else {
        this.errorMessage = b.msg;
      }
    });
    //this.router.navigate(['login']);
  }

}
