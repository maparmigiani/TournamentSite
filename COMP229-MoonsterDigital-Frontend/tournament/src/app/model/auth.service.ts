import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestDataSource } from './rest.datasource';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from './user.model';

@Injectable()
export class AuthService
{
  //user: User;

  constructor(private datasource: RestDataSource)
  {
    //this.user = new User();
  }

  saveUser(savedUser: User): Observable<any> {
    if (savedUser._id == null || savedUser._id === 0 || savedUser._id === undefined)
    {
      return this.datasource.registerUser(savedUser);
    }
    else
    {
      return this.datasource.modifyUser(savedUser);
    }
  }

  authenticate(authenticatedUser: User, userlist:any): Observable<any>
  {
    return this.datasource.authenticate(authenticatedUser, userlist);
  }

  login(pair: any): Observable<any> {
    return this.datasource.login(pair);
  }

  storeUserData(token: any, storedUser: User): void
  {
    this.datasource.storeUserData(token, storedUser);
  }

  get authenticated(): boolean
  {
    return this.datasource.loggedIn();
  }

  logout(): Observable<any>
  {
    return this.datasource.logout();
  }

  getDisplayName(): string
  {
    return this.datasource.getDisplayName();
  }
}
