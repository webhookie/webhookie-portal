import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Topic, WebhookGroup} from "../../../../model/webhook-group";
import {ArrayUtils} from "../../../../../../shared/array-utils";

@Component({
  selector: 'app-welcome-with-data',
  templateUrl: './welcome-with-data.component.html',
  styleUrls: ['./welcome-with-data.component.css']
})
export class WelcomeWithDataComponent implements OnInit {
  @Input() items!: Observable<Array<WebhookGroup>>
  firstRow: Array<TopicEx> = []
  rest: Array<Array<TopicEx>> = []

  topics: Array<TopicEx> = []
  chunked: Array<Array<TopicEx>> = []

  constructor() { }

  ngOnInit(): void {
    this.firstRow = []
    this.rest = []
    this.topics = []

    this.items.subscribe(list => {
      list.forEach(wg => {
        let topicExList = wg.topics.map(t => new TopicEx(t, wg))
        this.topics.push(...topicExList)
      });

      this.chunked = ArrayUtils.chunkArray(this.topics, 3);
      this.firstRow = this.chunked[0];
      this.rest = this.chunked.slice(1, this.chunked.length);
    });
  }

}

class TopicEx {
  constructor(
    public topic: Topic,
    public group: WebhookGroup
  ) {
  }
}
