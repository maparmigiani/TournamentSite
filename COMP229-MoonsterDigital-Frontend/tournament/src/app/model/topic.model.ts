/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

 export class Topic{
    constructor(
        public _id?:number,
        public topicTitle?:String,
        public date?:Date,
        public content?:String,
        public username?:String,
        public comments?:Comment[]
    ){}

    public toString(): string
    {
        return `
        Topic
        -------------------------------
        Id         : ${this._id}
        Topic Title: ${this.topicTitle}
        Date       : ${this.date}
        Content    : ${this.content}
        Username   : ${this.username}
        Comments   : ${this.comments}
        -------------------------------
        `;
    }
}
