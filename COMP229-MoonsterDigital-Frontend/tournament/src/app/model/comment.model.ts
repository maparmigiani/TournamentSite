/**
 * @GroupName MoonsterDigital
 * @FileName COMP229_W2022-Group4-MoonsterDigital
 * @CourseCode COMP229
 * @Date Mar 29th 2022
 * @CourseName Web Application Development SEC005
 */

 export class Comment{
    constructor(
        public _id?:number,
        public topicId?: number,
        public title?:String,
        public date?:Date,
        public content?:String,
        public username?:String,
    ){}

    public toString(): string
    {
        return `
        Comment
        -------------------------------
        Id         : ${this._id}
        Topic Id   : ${this.topicId}
        Title      : ${this.title}
        Date       : ${this.date}
        Content    : ${this.content}
        Username   : ${this.username}
        -------------------------------
        `;
    }
}
