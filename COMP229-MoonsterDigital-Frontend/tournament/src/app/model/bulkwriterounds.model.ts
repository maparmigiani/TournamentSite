
/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Apr 8th 2022
 * @CourseName Web Application Development SEC005
 */
 export class BulkWriteRounds{
    constructor(
        public tournamentId?: number,
        public player1?:String,
        public player2?:String,
        public player3?:String,
        public player4?:String,
        public player5?:String,
        public player6?:String,
        public player7?:String,
        public player8?:String,
    ){}
    public toString(): string
    {
        return `
        Bulk Write Player
        -------------------------------
        Tournament Id   : ${this.tournamentId}
        Player 1        : ${this.player1}
        Player 2        : ${this.player2}
        Player 3        : ${this.player3}
        Player 4        : ${this.player4}
        Player 5        : ${this.player5}
        Player 6        : ${this.player6}
        Player 7        : ${this.player7}
        Player 8        : ${this.player8}
        -------------------------------
        `;
    }
}