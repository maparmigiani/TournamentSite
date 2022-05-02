import { Injectable } from "@angular/core";
import { Tournament } from "./tournament.model";
import { from, Observable } from "rxjs";

@Injectable()
export class StaticDataSource{
    private tournaments: Tournament[] = [
        new Tournament(1, 'Table Tennis', '18th Dec 2022 2PM', '2'),
        new Tournament(2, 'Tennis', '12th Dec 2023 2PM', '3'),
        new Tournament(3, 'Cricket', '18th Jan 2023 5PM', '5'),
    ];
    
    getTournaments(): Observable<Tournament[]>{
        return from([this.tournaments])
    }

    
}