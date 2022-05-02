/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date April 06th 2022
 * @CourseName Web Application Development SEC005
 */

export class Rounds {
    constructor(
        public _id?: number,
        public TournamentId?: number,
        public QuarterFinal?: {
            team1?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team2?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team3?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team4?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team5?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team6?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team7?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team8?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
        },
        public SemiFinal?: {
            team1?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team2?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team3?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team4?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
        },
        public Final?: {
            team1?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
            team2?: [{
                id?: String, 
                tournamentId?: String, 
                number?: Number, 
                displayName?: String
            }],
        },
        public Winner?:[{
            id?: String, 
            tournamentId?: String, 
            number?: Number, 
            displayName?: String
        }]
    ){}

    public toString(): string
    {
        return `
        Rounds
        -------------------------------
        Id             : ${this._id}
        Tournament id  : ${this.TournamentId}
        QuarterFinal   : ${this.QuarterFinal}
        SemiFinal      : ${this.SemiFinal}
        Final          : ${this.Final}
        Winner         : ${this.Winner}
        -------------------------------
        `;
    }
}
