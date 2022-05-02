import { Injectable } from '@angular/core';
import { Topic } from './topic.model';
import { StaticDataSource } from './static.datasource';
import { User } from './user.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class TopicRepo {
    private topics: Topic[] = [];

    constructor(private dataSource: RestDataSource) {
        this.refresh();
    }

    refresh(): void{
        this.dataSource.getTopics().subscribe(data => {
            this.topics = data;
            this.storeTopicData(data);
        });
    }

    storeTopicData(topics: Topic[]) {
        localStorage.setItem('topics', JSON.stringify(topics));
        this.topics = topics;
    }

    loadTopics(): void {
        this.topics = JSON.parse(localStorage.getItem('topics')!);
    }

    getTopics() {
        this.loadTopics();
        return this.topics;
    }

    getTopic(id: any)
    {
        this.loadTopics();
        return this.topics.find(b => b._id == id)!;
    }

    saveTopic(savedTopic: Topic): void {
        if (savedTopic._id === null || savedTopic._id === 0 || savedTopic._id === undefined) {
            this.dataSource.addTopic(savedTopic).subscribe(b => {
                this.refresh();//this.topics.push(savedTopic);
            });
        }
    }

    get authenticated(): boolean
    {
      return this.dataSource.loggedIn();
    }

    get username(): String {
        return this.dataSource.getUsername();
    }
}
