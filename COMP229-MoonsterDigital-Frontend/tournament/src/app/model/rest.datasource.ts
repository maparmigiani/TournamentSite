import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from './tournament.model';
import { Player } from './player.model';
import { Topic } from './topic.model';
import { Comment } from './comment.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user.model';
import { BulkWritePlayers } from './bulkwriteplayers.model';
import { Rounds } from './rounds.model';
import { BulkWriteRounds } from './bulkwriterounds.model';

const PROTOCOL = 'https';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  user: User | null;
  authToken!: string;

  private httpOptions =
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      })
    };

  constructor(private http: HttpClient,
    private jwtService: JwtHelperService) {
    // this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/api/`;
    //this.baseUrl = `http://localhost:3000/tournament/`;
    this.baseUrl = `http://localhost:3000/api/`;
    this.user = new User();
  }

  getTopics(): Observable<Topic[]> {
    this.loadToken();
    return this.http.get<Topic[]>(this.baseUrl + 'topic/list');
  }

  addTopic(topic: Topic): Observable<Topic> {
    //console.log(JSON.stringify(topic));
    this.loadToken();
    return this.http.post<Topic>(this.baseUrl + 'topic/add', topic, this.httpOptions);
  }

  getComments(): Observable<Comment[]> {
    this.loadToken();
    return this.http.get<Comment[]>(this.baseUrl + 'comment/list');
  }

  addComment(comment: Comment): Observable<Comment> {
    //console.log(JSON.stringify(comment));
    this.loadToken();
    return this.http.post<Comment>(this.baseUrl + 'comment/add', comment, this.httpOptions);
  }

  getTournaments(): Observable<Tournament[]> {
    this.loadToken();
    return this.http.get<Tournament[]>(this.baseUrl + 'tournament/list');
  }

  addTournaments(tournament: Tournament): Observable<Tournament> {
    this.loadToken();
    return this.http.post<Tournament>(this.baseUrl + 'tournament/add', tournament, this.httpOptions);
  }

  deleteTournament(id: Object): Observable<Tournament> {
    this.loadToken();
    //console.log(id);
    return this.http.get<Tournament>(this.baseUrl + 'tournament/delete/' + id, this.httpOptions);
  }

  editTournament(tournament: Tournament): Observable<Tournament> {
    this.loadToken();
    return this.http.post<Tournament>(`${this.baseUrl}tournament/edit/${tournament._id}`, tournament, this.httpOptions);
  }

  getRegisteredPlayers(): Observable<Player[]> {
    this.loadToken();
    return this.http.get<Player[]>(this.baseUrl + 'player/list');
  }

  getBulkWritePlayers(): Observable<BulkWritePlayers[]> {
    this.loadToken();
    return this.http.get<BulkWritePlayers[]>(this.baseUrl + 'player/bulk-upsert', this.httpOptions);
  }

  bulkWriteRegisteredPlayers(bulkWritePlayers: BulkWritePlayers): Observable<any>{
      this.loadToken();
      return this.http.post<BulkWritePlayers>(`${this.baseUrl}player/bulk-upsert`, bulkWritePlayers, this.httpOptions);
  }

  getRounds(): Observable<Rounds[]> {
    this.loadToken();
    return this.http.get<Rounds[]>(this.baseUrl + 'rounds/list');
  }

  upsertQuarterFinalResults(winners: any): Observable<any> {
    this.loadToken();
    return this.http.post<any>(`${this.baseUrl}rounds/upsert-semiFinals`, winners, this.httpOptions);
  }

  upsertSemiFinalResults(winners: any): Observable<any>{
    this.loadToken();
    return this.http.post<BulkWritePlayers>(`${this.baseUrl}rounds/upsert-finals`, winners, this.httpOptions);
  }

  upsertFinalResults(winners: any): Observable<any>{
    this.loadToken();
    return this.http.post<any>(`${this.baseUrl}rounds/upsert-winner`, winners, this.httpOptions);
  }

  authenticate(user: User, userlist: any): Observable<any> {
    let body: any = {};
    body['body'] = user;
    body['userList'] = userlist
    return this.http.post<any>('http://localhost:3000/' + 'login', body, this.httpOptions);
  }

  login(pair: any): Observable<any> {
    //console.log(this.baseUrl + 'login');
    return this.http.post<any>(this.baseUrl + 'login', pair);
  }

  registerUser(registeredUser: User): Observable<any> {
    this.loadToken();
    return this.http.post<User>(this.baseUrl + 'register', registeredUser, this.httpOptions);
  }

  modifyUser(modifiedUser: User): Observable<any> {
    this.loadToken();
    return this.http.post<User>(this.baseUrl + 'editUser', modifiedUser, this.httpOptions); //TODO, server side not yet implemented
  }

  storeUserData(token: any, user: User): void {
    localStorage.setItem('id_token', 'Bearer ' + token);
    this.authToken = token;

    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  private loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  private loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token || '';
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }

  logout(): Observable<any> {
    this.authToken = null || '';
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('id_token');


    return this.http.get<any>('http://localhost:3000/' + 'logout', this.httpOptions);
  }

  loggedIn(): boolean {
    // console.log(this.authToken);
    this.loadToken();
    return !this.jwtService.isTokenExpired(this.authToken);
  }

  getDisplayName(): string {
    this.loadUser();

    if (this.user != null)
      return this.user.displayName;
    else
        return '';
  }

  getUsername(): String {
    this.loadUser();
    
    if (this.user != null)
      return this.user.username;
    else
        return '';
  }
}

