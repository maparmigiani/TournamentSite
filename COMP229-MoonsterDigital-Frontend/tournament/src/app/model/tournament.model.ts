/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

export class Tournament{
    constructor(
        public _id?:number,
        public owner?:String,
        public title?:String,
        public description?:String,
        public isActive?:Boolean,
        public isCompleted?:Boolean,
        public players?:String,
        public startDate?:Date,
        public endDate?:Date,
        public rounds?:String,
    ){}

    public toString(): string
    {
        return `
        Tournament
        -------------------------------
        Id         : ${this._id}
        Owner      : ${this.owner}
        Title      : ${this.title}
        Description: ${this.description}
        IsActive   : ${this.isActive}
        IsComplete : ${this.isCompleted}
        Players    : ${this.players}
        Start Date : ${this.startDate}
        End Date   : ${this.endDate}
        Rounds     : ${this.rounds}
        -------------------------------
        `;
    }
}
