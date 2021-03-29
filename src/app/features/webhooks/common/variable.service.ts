import {Injectable} from '@angular/core';
import {BreadcrumbService} from 'angular-crumbs';
import {WebhookGroupElement} from "../webhook-page/sidebar/sidebar-list/webhook-group-element";
import {ReplaySubject, Subject} from "rxjs";
import {Topic} from "../model/webhook-group";

@Injectable({
  providedIn: 'root'
})
export class VariableService {
  breadcrumbs: any;
  test_res:boolean=false;
  subscribe_res:boolean=false;
  showText:boolean = false;
  selectedWebhook?: WebhookGroupElement;
  readonly _selectedWebhookGroup: Subject<WebhookGroupElement> = new ReplaySubject()
  selectedTopic?: Topic;

  selectWebhookGroup(webhookGroup: WebhookGroupElement) {
    this.selectTopic(webhookGroup, webhookGroup.topics[0]);
  }

  selectTopic(webhookGroup: WebhookGroupElement, topic: Topic) {
    if(this.selectedWebhook) {
      this.selectedWebhook?.hide();
    }
    this.selectedWebhook = webhookGroup;
    this.selectedTopic = topic;
    webhookGroup.toggle();
  }

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadCrumbs();

    this._selectedWebhookGroup
      .subscribe(it => this.selectWebhookGroup(it));
  }

   breadCrumbs(){
    this.breadcrumbService.breadcrumbChanged.subscribe(crumbs => {
       this.breadcrumbs=crumbs;
    });
    return this.breadcrumbs;
   }

   syntaxHighlight(json:string) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
}
